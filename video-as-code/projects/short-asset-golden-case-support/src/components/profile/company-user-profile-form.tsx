import { Loader2 } from 'lucide-react'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
  type RefObject,
} from 'react'
import { toast } from 'sonner'

import { CompanySelectionPrompt } from '@/components/company-selection-prompt'
import { OnboardingUserProfileSkeleton } from '@/components/onboarding/onboarding-step-skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  getCurrentCompanyUserProfile,
  type UserProfile,
  upsertCurrentCompanyUserProfile,
  uploadUserAvatar,
} from '@/lib/services/user-profile'
import { m } from '@/paraglide/messages'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

/**
 * 昵称长度规则：
 * - 使用字符数而不是字节数，兼容中文、Emoji 与多语言输入。
 */
const MIN_DISPLAY_NAME_LENGTH = 3
const MAX_DISPLAY_NAME_LENGTH = 16

/**
 * 头像大小限制：
 * - 统一沿用 onboarding 现有约束，避免前后两个入口行为不一致。
 */
const MAX_AVATAR_FILE_SIZE = 2 * 1024 * 1024

export type CompanyUserProfileFormVariant = 'onboarding' | 'settings'

type SavedUserProfilePayload = {
  companyId: string
  profile: UserProfile
}

type CompanyUserProfileFormProps = {
  companyId: string | null
  submitLabel: string
  variant?: CompanyUserProfileFormVariant
  emptyStateMessage?: string
  successMessage?: string
  extraContent?: ReactNode
  afterSave?: (payload: SavedUserProfilePayload) => Promise<void> | void
  onSaved?: (payload: SavedUserProfilePayload) => void
}

type CompanyUserProfileFormViewProps = {
  activeAvatarUrl: string | null
  avatarFallbackContent: string
  companyId: string | null
  companyLoadError: string | null
  emptyStateMessage: string
  fileInputRef: RefObject<HTMLInputElement | null>
  isInitializing: boolean
  isSaving: boolean
  nickname: string
  nicknameErrorMessage: string | null
  submitLabel: string
  onAvatarFileSelect: (event: ChangeEvent<HTMLInputElement>) => void
  onNicknameChange: (value: string) => void
  onRetry: () => void
  onSubmit: () => void
}

function countCharacters(inputValue: string): number {
  return Array.from(inputValue).length
}

/**
 * 昵称校验：
 * - 与原 onboarding 页面保持同一套规则；
 * - 返回 `null` 代表通过，字符串代表业务可读错误。
 */
function validateDisplayName(displayName: string): string | null {
  const trimmedDisplayName = displayName.trim()
  const displayNameLength = countCharacters(trimmedDisplayName)

  if (!trimmedDisplayName) {
    return m.profile_required_display_name()
  }

  if (displayNameLength < MIN_DISPLAY_NAME_LENGTH || displayNameLength > MAX_DISPLAY_NAME_LENGTH) {
    return m.profile_display_name_length_error({
      min: String(MIN_DISPLAY_NAME_LENGTH),
      max: String(MAX_DISPLAY_NAME_LENGTH),
    })
  }

  return null
}

/**
 * 头像空态占位：
 * - settings 与 onboarding 都复用同一视觉稿；
 * - 无头像时保持原始插画符号，不额外引入新的 fallback 样式。
 */
function resolveAvatarFallbackContent(): string {
  return '👾'
}

export function CompanyUserProfileForm(props: CompanyUserProfileFormProps) {
  const {
    companyId,
    submitLabel,
    variant = 'settings',
    emptyStateMessage = m.settings_select_company_first(),
    successMessage = m.profile_save_success(),
    extraContent,
    afterSave,
    onSaved,
  } = props

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const isMountedRef = useRef<boolean>(true)
  const loadRequestIdRef = useRef<number>(0)

  const [isInitializing, setIsInitializing] = useState<boolean>(true)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [nickname, setNickname] = useState<string>('')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [avatarStoragePath, setAvatarStoragePath] = useState<string | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null)
  const [companyLoadError, setCompanyLoadError] = useState<string | null>(null)

  useEffect(() => {
    /**
     * 每次组件进入可见生命周期时都显式恢复 mounted 标记：
     * - 避免开发态 effect 重放、路由切换复用等场景下残留 `false`；
     * - 否则异步初始化完成后会被误判为“组件已卸载”，页面就会一直停在 loading。
     */
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
    }
  }, [])

  /**
   * 释放预览 URL：
   * - 更换头像或组件卸载时都要释放，避免浏览器保留无用 blob 引用。
   */
  useEffect(() => {
    return () => {
      if (avatarPreviewUrl) {
        URL.revokeObjectURL(avatarPreviewUrl)
      }
    }
  }, [avatarPreviewUrl])

  const clearPendingAvatarSelection = useCallback((): void => {
    setAvatarFile(null)
    setAvatarPreviewUrl((currentPreviewUrl) => {
      if (currentPreviewUrl) {
        URL.revokeObjectURL(currentPreviewUrl)
      }
      return null
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  /**
   * 统一加载当前公司下的个人资料：
   * - settings 与 onboarding 共用一套数据初始化逻辑；
   * - 用请求序号防止切公司时旧请求回写新状态。
   */
  const initializeProfile = useCallback(async (): Promise<void> => {
    if (!companyId) {
      loadRequestIdRef.current += 1
      clearPendingAvatarSelection()
      setNickname('')
      setAvatarUrl(null)
      setAvatarStoragePath(null)
      setCompanyLoadError(null)
      setIsInitializing(false)
      return
    }

    const currentRequestId = loadRequestIdRef.current + 1
    loadRequestIdRef.current = currentRequestId

    setIsInitializing(true)
    setCompanyLoadError(null)

    try {
      const supabase = getSupabaseBrowserClient()
      const { profile } = await getCurrentCompanyUserProfile(supabase, {
        companyId,
      })

      if (!isMountedRef.current || loadRequestIdRef.current !== currentRequestId) {
        return
      }

      clearPendingAvatarSelection()
      setNickname(profile.displayName)
      setAvatarUrl(profile.avatarUrl)
      setAvatarStoragePath(profile.avatarStoragePath)
    } catch (error) {
      if (!isMountedRef.current || loadRequestIdRef.current !== currentRequestId) {
        return
      }

      const message = error instanceof Error ? error.message : m.profile_init_failed()
      setCompanyLoadError(message)
    } finally {
      if (isMountedRef.current && loadRequestIdRef.current === currentRequestId) {
        setIsInitializing(false)
      }
    }
  }, [clearPendingAvatarSelection, companyId])

  useEffect(() => {
    void initializeProfile()
  }, [initializeProfile])

  const activeAvatarUrl = avatarPreviewUrl || avatarUrl
  const nicknameErrorMessage = useMemo(() => validateDisplayName(nickname), [nickname])
  const avatarFallbackContent = useMemo(() => resolveAvatarFallbackContent(), [])

  const handleAvatarFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const nextFile = event.target.files?.[0]
    if (!nextFile) {
      return
    }

    if (!nextFile.type.startsWith('image/')) {
      toast.error(m.profile_avatar_must_be_image())
      event.target.value = ''
      return
    }

    if (nextFile.size > MAX_AVATAR_FILE_SIZE) {
      toast.error(m.profile_avatar_size_limit({ size: '2MB' }))
      event.target.value = ''
      return
    }

    setAvatarPreviewUrl((currentPreviewUrl) => {
      if (currentPreviewUrl) {
        URL.revokeObjectURL(currentPreviewUrl)
      }
      return URL.createObjectURL(nextFile)
    })
    setAvatarFile(nextFile)
    event.target.value = ''
  }

  /**
   * 保存个人资料：
   * 1. 读取当前用户 ID；
   * 2. 如有新头像则先上传；
   * 3. 写入当前公司下的昵称与头像；
   * 4. 交给外层页面补充 onboarding 完成、跳转等额外动作。
   */
  const handleSaveProfile = async (): Promise<void> => {
    if (!companyId) {
      toast.error(emptyStateMessage)
      return
    }

    const trimmedNickname = nickname.trim()
    const validationErrorMessage = validateDisplayName(trimmedNickname)
    if (validationErrorMessage) {
      toast.error(validationErrorMessage)
      return
    }

    setIsSaving(true)

    try {
      const supabase = getSupabaseBrowserClient()
      const { userId, profile } = await getCurrentCompanyUserProfile(supabase, {
        companyId,
      })

      let nextAvatarUrl = avatarUrl || profile.avatarUrl
      let nextAvatarStoragePath = avatarStoragePath || profile.avatarStoragePath

      if (avatarFile) {
        const uploadResult = await uploadUserAvatar(supabase, {
          companyId,
          userId,
          file: avatarFile,
        })

        nextAvatarUrl = uploadResult.publicUrl
        nextAvatarStoragePath = uploadResult.storagePath
      }

      const savedProfile: UserProfile = {
        displayName: trimmedNickname,
        avatarUrl: nextAvatarUrl,
        avatarStoragePath: nextAvatarStoragePath,
      }

      await upsertCurrentCompanyUserProfile(supabase, {
        companyId,
        profile: savedProfile,
      })

      if (afterSave) {
        await afterSave({
          companyId,
          profile: savedProfile,
        })
      }

      if (isMountedRef.current) {
        setNickname(savedProfile.displayName)
        setAvatarUrl(savedProfile.avatarUrl)
        setAvatarStoragePath(savedProfile.avatarStoragePath)
        clearPendingAvatarSelection()
      }

      toast.success(successMessage)
      onSaved?.({
        companyId,
        profile: savedProfile,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : m.profile_save_error()
      toast.error(message)
    } finally {
      if (isMountedRef.current) {
        setIsSaving(false)
      }
    }
  }

  const viewProps: CompanyUserProfileFormViewProps = {
    activeAvatarUrl,
    avatarFallbackContent,
    companyId,
    companyLoadError,
    emptyStateMessage,
    fileInputRef,
    isInitializing,
    isSaving,
    nickname,
    nicknameErrorMessage,
    submitLabel,
    onAvatarFileSelect: handleAvatarFileSelect,
    onNicknameChange: setNickname,
    onRetry: () => {
      void initializeProfile()
    },
    onSubmit: () => {
      void handleSaveProfile()
    },
  }

  if (variant === 'onboarding') {
    return <OnboardingCompanyUserProfileForm {...viewProps} />
  }

  return <SettingsCompanyUserProfileForm {...viewProps} extraContent={extraContent} />
}

function OnboardingCompanyUserProfileForm(props: CompanyUserProfileFormViewProps) {
  const {
    activeAvatarUrl,
    avatarFallbackContent,
    companyId,
    companyLoadError,
    emptyStateMessage,
    fileInputRef,
    isInitializing,
    isSaving,
    nickname,
    nicknameErrorMessage,
    submitLabel,
    onAvatarFileSelect,
    onNicknameChange,
    onRetry,
    onSubmit,
  } = props

  if (!companyId) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <CompanySelectionPrompt
          message={emptyStateMessage}
          layout="centered"
          className="w-full max-w-[360px]"
        />
      </div>
    )
  }

  if (isInitializing) {
    return <OnboardingUserProfileSkeleton />
  }

  if (companyLoadError) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center gap-3">
        <p className="text-center text-[14px] font-medium text-[#DC2626]">{companyLoadError}</p>
        <Button
          type="button"
          variant="dashboardTinted"
          size="sm"
          className="w-full rounded-[8px] px-4 text-[13px] font-semibold sm:w-auto"
          onClick={onRetry}
        >
          {m.common_retry()}
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-[220px] flex-col items-center gap-3">
        <Avatar className="h-24 w-24 bg-[#E9DDFB] sm:h-[120px] sm:w-[120px]">
          {activeAvatarUrl ? <AvatarImage src={activeAvatarUrl} alt={m.profile_avatar_preview_alt()} /> : null}
          <AvatarFallback className="bg-[#E9DDFB] text-[44px] leading-none text-black sm:text-[56px]">
            {avatarFallbackContent}
          </AvatarFallback>
        </Avatar>

        <Button
          type="button"
          variant="dashboardTinted"
          size="sm"
          className="w-full rounded-[8px] px-3 font-['PingFang_SC','PingFang SC',sans-serif] text-[14px] font-medium leading-[1.6] tracking-[-0.14px] sm:w-auto"
          onClick={() => {
            fileInputRef.current?.click()
          }}
        >
          {m.profile_choose_avatar()}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onAvatarFileSelect}
        />
      </div>

      <p className="mt-8 text-center font-['PingFang_SC','PingFang SC',sans-serif] text-[14px] font-medium leading-[1.6] tracking-[-0.14px] text-black">
        {m.profile_enter_nickname()}
      </p>

      <div className="mx-auto mt-4 w-full max-w-[290px] border-b border-[#B9C6F3] pb-[6px]">
        <label htmlFor="onboarding-profile-nickname" className="sr-only">
          {m.profile_nickname_label()}
        </label>
        <input
          id="onboarding-profile-nickname"
          name="nickname"
          value={nickname}
          onChange={(event) => {
            onNicknameChange(event.target.value)
          }}
          placeholder={m.profile_nickname_placeholder()}
          className="w-full bg-transparent text-center font-['Outfit','PingFang_SC','PingFang SC',sans-serif] text-[28px] font-semibold tracking-[0.32px] text-[#6466F1] outline-none placeholder:text-[#A5B4FC] sm:text-[32px]"
        />
      </div>

      <p className="mt-[14px] text-center font-['PingFang_SC','PingFang SC',sans-serif] text-[12px] font-medium leading-[1.6] text-[#6B7280]">
        {m.profile_nickname_hint({
          min: String(MIN_DISPLAY_NAME_LENGTH),
          max: String(MAX_DISPLAY_NAME_LENGTH),
        })}
      </p>

      {nicknameErrorMessage ? (
        <p className="mt-2 text-center text-[12px] font-medium text-[#DC2626]">{nicknameErrorMessage}</p>
      ) : null}

      <Button
        type="button"
        variant="dashboardPrimary"
        className="mx-auto mt-10 flex h-12 w-full max-w-[364px] rounded-xl px-4 text-[14px] font-semibold"
        onClick={onSubmit}
        disabled={isSaving}
      >
        {isSaving ? <Loader2 className="h-[18px] w-[18px] animate-spin text-white" /> : submitLabel}
      </Button>
    </>
  )
}

function SettingsCompanyUserProfileForm(
  props: CompanyUserProfileFormViewProps & {
    extraContent?: ReactNode
  },
) {
  const { extraContent, ...viewProps } = props

  return (
    <div className="mx-auto w-full max-w-[460px]">
      <section className="min-h-[519px] w-full rounded-2xl bg-white px-8 pb-10 pt-[50px] md:px-12">
        <OnboardingCompanyUserProfileForm {...viewProps} />

        {extraContent ? <div className="mt-10">{extraContent}</div> : null}
      </section>
    </div>
  )
}
