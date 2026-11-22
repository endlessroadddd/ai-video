import { Copy, Link2, MoreVertical, RefreshCcw, Shield, Trash2 } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

import { SettingsSectionShell, SETTINGS_SECTION_SURFACE_CLASS_NAME } from '@/components/settings/settings-section-shell'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type {
  CompanyRole,
  MemberRecord,
  MemberRole,
  MemberStatus,
  PlatformType,
} from '@/lib/services/member-management-api'
import { m } from '@/paraglide/messages'
import { getLocale } from '@/paraglide/runtime'

const EMAIL_REGEX: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const AVATAR_FALLBACK_COLORS: ReadonlyArray<string> = ['#60A5FA', '#F87171', '#FBBF24', '#A78BFA', '#34D399', '#F472B6']

type EditableMemberRole = Exclude<MemberRole, 'owner'>
type InviteMethod = 'email' | 'link'

/**
 * 平台展示名。
 */
function getPlatformLabel(platform: PlatformType): string {
  if (platform === 'discord') return m.platform_discord()
  if (platform === 'telegram') return m.platform_telegram()
  if (platform === 'feishu') return m.platform_feishu()
  return m.platform_slack()
}

/**
 * 平台品牌图标：
 * - 使用本地静态资源，保证成员表和其他页面的品牌图标一致；
 * - 统一尺寸后，不同平台图标在同一列里会更整齐。
 */
function PlatformBrandImageIcon(props: { src: string; alt: string; className?: string }) {
  const { src, alt, className } = props

  return <img src={src} alt={alt} className={`size-4 shrink-0 object-contain ${className || ''}`} loading="lazy" decoding="async" />
}

/**
 * 平台图标资源映射：
 * - 成员平台列只关心当前已支持的四个平台；
 * - 继续复用 public/platform-icons 下现有品牌资源。
 */
function getPlatformIconSrc(platform: PlatformType): string {
  if (platform === 'discord') return '/platform-icons/discord.svg'
  if (platform === 'telegram') return '/platform-icons/telegram.svg'
  if (platform === 'feishu') return '/platform-icons/feishu.svg'
  return '/platform-icons/slack.svg'
}

/**
 * 角色展示名。
 */
function getMemberRoleLabel(role: MemberRole): string {
  if (role === 'owner') return m.role_owner()
  if (role === 'admin') return m.role_admin()
  return m.role_member()
}

/**
 * 角色标签样式：
 * - Owner 使用强调色；
 * - Admin/Member 使用中性灰背景。
 */
function getMemberRoleChipClassName(role: MemberRole): string {
  if (role === 'owner') {
    return 'bg-[#E0E7FF] text-[#6466F1]'
  }

  return 'bg-[#E5E7EB] text-[#6B7280]'
}

/**
 * 最近活跃时间展示：
 * - 邀请状态始终显示“待加入”；
 * - 7 天内使用相对时间；
 * - 没有活跃记录时明确展示“未记录”，避免把加入时间误认为活跃时间；
 * - 更早时间展示绝对日期（和设计稿一致）。
 */
function formatRecentActivityLabel(recentActivityAt: string | null, status: MemberStatus): string {
  if (status === 'invited') {
    return m.member_management_recent_pending_join()
  }

  if (!recentActivityAt) {
    return m.member_management_recent_unrecorded()
  }

  const date = new Date(recentActivityAt)
  if (Number.isNaN(date.getTime())) {
    return recentActivityAt
  }

  const diffMs = Math.max(0, Date.now() - date.getTime())
  const diffMinutes = Math.floor(diffMs / (1000 * 60))

  if (diffMinutes < 1) {
    return m.common_just_now()
  }
  if (diffMinutes < 60) {
    return m.common_minutes_ago({ count: diffMinutes })
  }

  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) {
    return m.common_hours_ago({ count: diffHours })
  }

  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 2) {
    return m.common_days_ago({ count: 1 })
  }
  if (diffDays < 7) {
    return m.common_days_ago({ count: diffDays })
  }

  return date.toLocaleDateString(getLocale() === 'zh' ? 'zh-CN' : 'en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}

/**
 * 列表昵称展示：
 * - 优先使用服务端返回的 `company_user_profile.display_name`；
 * - 缺失时回退到邮箱前缀，保证始终有可读名称。
 */
function getMemberDisplayName(member: Pick<MemberRecord, 'displayName' | 'email'>): string {
  const profileDisplayName = member.displayName.trim()
  if (profileDisplayName) {
    return profileDisplayName
  }

  const email = member.email.trim()
  const localPart = email.split('@')[0]?.trim() || ''
  if (!localPart) {
    return m.member_management_fallback_name()
  }

  const normalizedValue = localPart.replace(/[._-]+/g, ' ').trim()
  const firstSegment = normalizedValue.split(/\s+/).find((segment) => segment.length > 0) || localPart
  return `${firstSegment.charAt(0).toUpperCase()}${firstSegment.slice(1)}`
}

/**
 * 头像 fallback 文本：
 * - 英文昵称取前两位；
 * - 非英文昵称至少保留首字符。
 */
function getMemberInitials(displayName: string): string {
  const sanitizedName = displayName.trim()
  if (!sanitizedName) {
    return 'U'
  }

  const words = sanitizedName.split(/\s+/).filter(Boolean)
  if (words.length >= 2) {
    return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase()
  }

  return sanitizedName.slice(0, 2).toUpperCase()
}

/**
 * 基于成员 ID 生成稳定的头像底色，保证同一成员在刷新后颜色不变。
 */
function getAvatarFallbackColor(seed: string): string {
  let hash = 0
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0
  }

  return AVATAR_FALLBACK_COLORS[hash % AVATAR_FALLBACK_COLORS.length]
}

async function copyTextToClipboard(value: string): Promise<void> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value)
    return
  }

  if (typeof document === 'undefined') {
    throw new Error(m.member_management_invite_link_copy_failed())
  }

  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', 'true')
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()

  const isCopied = document.execCommand('copy')
  document.body.removeChild(textarea)

  if (!isCopied) {
    throw new Error(m.member_management_invite_link_copy_failed())
  }
}

function MemberManagementRowSkeleton(props: { nameWidth: string; emailWidth: string }) {
  const { nameWidth, emailWidth } = props

  return (
    <div className="dashboard-skeleton-border flex min-h-[52px] items-center border-b bg-white px-3 py-[10px]">
      <div className="flex w-[40%] items-center gap-[10px] pr-4">
        <Skeleton className="dashboard-skeleton--strong size-8 shrink-0 rounded-full" />

        <div className="min-w-0 space-y-2">
          <Skeleton className="dashboard-skeleton--base h-3 rounded-[4px]" style={{ width: nameWidth }} />
          <Skeleton className="dashboard-skeleton--soft h-3 rounded-[4px]" style={{ width: emailWidth }} />
        </div>
      </div>

      <div className="w-[14%] px-4">
        <div className="flex items-center gap-2">
          <Skeleton className="dashboard-skeleton--soft size-4 rounded-[4px]" />
          <Skeleton className="dashboard-skeleton--soft size-4 rounded-[4px]" />
        </div>
      </div>

      <div className="w-[18%] px-4">
        <Skeleton className="dashboard-skeleton--soft h-6 w-[62px] rounded-[4px]" />
      </div>

      <div className="w-[22%] px-4">
        <Skeleton className="dashboard-skeleton--soft h-3 w-[78px] rounded-[4px]" />
      </div>

      <div className="flex w-[6%] justify-end px-3">
        <Skeleton className="dashboard-skeleton--base h-6 w-6 rounded-[4px]" />
      </div>
    </div>
  )
}

/**
 * 人员管理页骨架：
 * - 复刻成员表格主区块；
 * - 避免 loading 时退化成单行提示，进入页面后再突然跳成完整表格。
 */
export function MemberManagementPanelSkeleton() {
  return (
    <SettingsSectionShell
      title={m.member_management_title()}
      actions={<Skeleton className="dashboard-skeleton--accent h-8 min-w-[134px] rounded-lg" />}
    >
      <Card className={`${SETTINGS_SECTION_SURFACE_CLASS_NAME} overflow-hidden`}>
        <CardContent className="p-0">
          <div className="dashboard-skeleton-border flex h-8 items-center border-y bg-transparent px-3">
            <div className="w-[40%] px-[3px]">
              <Skeleton className="dashboard-skeleton--base h-3 w-[84px] rounded-[4px]" />
            </div>
            <div className="w-[14%] px-4">
              <Skeleton className="dashboard-skeleton--base h-3 w-[52px] rounded-[4px]" />
            </div>
            <div className="w-[18%] px-4">
              <Skeleton className="dashboard-skeleton--base h-3 w-[44px] rounded-[4px]" />
            </div>
            <div className="w-[22%] px-4">
              <Skeleton className="dashboard-skeleton--base h-3 w-[68px] rounded-[4px]" />
            </div>
          </div>

          <MemberManagementRowSkeleton nameWidth="96px" emailWidth="164px" />
          <MemberManagementRowSkeleton nameWidth="118px" emailWidth="184px" />
          <MemberManagementRowSkeleton nameWidth="88px" emailWidth="154px" />
          <MemberManagementRowSkeleton nameWidth="104px" emailWidth="176px" />
        </CardContent>
      </Card>
    </SettingsSectionShell>
  )
}

/**
 * 计算删除按钮可用性：
 * - owner 可删除 admin/member；
 * - admin 仅可删除 member（包含 member 邀请）；
 * - owner 与当前登录账号不可删除。
 */
function getRemoveDisabledReason(currentUserRole: CompanyRole, member: MemberRecord): string | null {
  if (member.isCurrentUser) {
    return m.member_management_remove_current_user()
  }

  if (member.status === 'active' && member.role === 'owner') {
    return m.member_management_remove_owner()
  }

  if (currentUserRole === 'owner') {
    return null
  }

  if (currentUserRole === 'admin') {
    if (member.role === 'member') {
      return null
    }
    return member.status === 'invited'
      ? m.member_management_admin_cancel_member_invite_only()
      : m.member_management_admin_remove_member_only()
  }

  return m.member_management_owner_only_action()
}

/**
 * 计算角色调整按钮可用性：
 * - owner 可调整 admin/member；
 * - admin 仅可调整当前为 member 的成员或邀请；
 * - owner / 当前登录账号不允许在此处变更。
 */
function getRoleUpdateDisabledReason(currentUserRole: CompanyRole, member: MemberRecord): string | null {
  if (member.isCurrentUser) {
    return m.member_management_update_current_user_role()
  }

  if (member.role === 'owner') {
    return m.member_management_update_owner_role()
  }

  if (currentUserRole === 'owner') {
    return null
  }

  if (currentUserRole === 'admin') {
    if (member.role === 'member') {
      return null
    }

    return member.status === 'invited'
      ? m.member_management_admin_update_member_invite_only()
      : m.member_management_admin_update_member_only()
  }

  return m.member_management_owner_only_action()
}

/**
 * 操作菜单极简提示：
 * - 当成员当前没有任何可执行动作时，用一条短提示替代多条禁用说明；
 * - 让菜单更干净，避免重复解释。
 */
function getMemberActionMenuHint(currentUserRole: CompanyRole, member: MemberRecord): string | null {
  if (member.isCurrentUser) {
    return m.member_management_menu_hint_current_account()
  }

  if (member.role === 'owner') {
    return m.member_management_menu_hint_owner()
  }

  if (currentUserRole !== 'owner' && currentUserRole !== 'admin') {
    return m.member_management_menu_hint_no_permission()
  }

  if (currentUserRole === 'admin' && member.role !== 'member') {
    return m.member_management_menu_hint_no_permission()
  }

  return null
}

/**
 * 成员状态展示名。
 */
function getMemberStatusLabel(status: MemberStatus): string {
  if (status === 'invited') {
    return m.member_management_status_invited()
  }

  return m.member_management_status_joined()
}

/**
 * 人员管理分区。
 * 这里显式使用 shadcn Table + Dialog，和 Linear 的设置页结构保持一致：
 * - 上方操作按钮；
 * - 中间信息表；
 * - 弹窗执行邀请。
 */
export function MemberManagementPanel(props: {
  currentUserRole: CompanyRole
  members: MemberRecord[]
  adminLimit: number
  memberActionMessage: string | null
  onRemoveMember: (payload: { memberId: string; memberStatus: MemberStatus }) => void
  onInviteMember: (payload: { email: string; role: EditableMemberRole }) => Promise<string>
  onCreateInviteLink: (payload: { role: EditableMemberRole }) => Promise<{ message: string; inviteLink: string }>
  onUpdateMemberRole: (payload: { memberId: string; memberStatus: MemberStatus; role: EditableMemberRole }) => Promise<string>
}) {
  const {
    currentUserRole,
    members,
    adminLimit,
    memberActionMessage,
    onRemoveMember,
    onInviteMember,
    onCreateInviteLink,
    onUpdateMemberRole,
  } = props

  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState<boolean>(false)
  const [inviteMethod, setInviteMethod] = useState<InviteMethod>('email')
  const [inviteEmail, setInviteEmail] = useState<string>('')
  const [inviteRole, setInviteRole] = useState<EditableMemberRole>('member')
  const [inviteErrorMessage, setInviteErrorMessage] = useState<string | null>(null)
  const [generatedInviteLink, setGeneratedInviteLink] = useState<string>('')
  const [memberManagementErrorMessage, setMemberManagementErrorMessage] = useState<string | null>(null)
  const [memberManagementSuccessMessage, setMemberManagementSuccessMessage] = useState<string | null>(null)
  const [isInviting, setIsInviting] = useState<boolean>(false)
  const [isCreatingInviteLink, setIsCreatingInviteLink] = useState<boolean>(false)
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState<boolean>(false)
  const [selectedRoleMember, setSelectedRoleMember] = useState<MemberRecord | null>(null)
  const [nextRole, setNextRole] = useState<EditableMemberRole>('member')
  const [updateRoleErrorMessage, setUpdateRoleErrorMessage] = useState<string | null>(null)
  const [isUpdatingRole, setIsUpdatingRole] = useState<boolean>(false)
  const [resendingInviteMemberId, setResendingInviteMemberId] = useState<string | null>(null)

  const adminCount: number = useMemo(
    () => members.filter((member) => member.role === 'admin' && member.status === 'active').length,
    [members],
  )
  const isAdminRoleOptionDisabled: boolean = useMemo(() => {
    if (!selectedRoleMember) {
      return adminCount >= adminLimit
    }

    if (selectedRoleMember.role === 'admin') {
      return false
    }

    return adminCount >= adminLimit
  }, [adminCount, adminLimit, selectedRoleMember])

  const canManageMembers: boolean = currentUserRole === 'owner' || currentUserRole === 'admin'

  const resetInviteDialogFeedback = useCallback((): void => {
    setInviteErrorMessage(null)
    setGeneratedInviteLink('')
    setMemberManagementErrorMessage(null)
    setMemberManagementSuccessMessage(null)
  }, [])

  const validateInviteForm = useCallback((): {
    normalizedEmail: string | null
    role: EditableMemberRole
  } | null => {
    const normalizedEmail: string = inviteEmail.trim().toLowerCase()

    if (inviteMethod === 'email' && !EMAIL_REGEX.test(normalizedEmail)) {
      setInviteErrorMessage(m.member_management_invalid_email())
      return null
    }

    if (inviteRole === 'admin' && adminCount >= adminLimit) {
      setInviteErrorMessage(
        m.member_management_admin_quota_full_invite({
          count: adminCount,
          limit: adminLimit,
        }),
      )
      return null
    }

    return {
      normalizedEmail: inviteMethod === 'email' ? normalizedEmail : null,
      role: inviteRole,
    }
  }, [adminCount, adminLimit, inviteEmail, inviteMethod, inviteRole])

  const handleSendInvite = useCallback(async (): Promise<void> => {
    resetInviteDialogFeedback()

    const invitePayload = validateInviteForm()
    if (!invitePayload) {
      return
    }

    setIsInviting(true)
    try {
      if (!invitePayload.normalizedEmail) {
        throw new Error(m.member_management_invalid_email())
      }

      const successMessage: string = await onInviteMember({
        email: invitePayload.normalizedEmail,
        role: invitePayload.role,
      })
      setMemberManagementSuccessMessage(successMessage)
      setIsInviteDialogOpen(false)
      setInviteMethod('email')
      setInviteEmail('')
      setInviteRole('member')
      setGeneratedInviteLink('')
    } catch (error) {
      setInviteErrorMessage(error instanceof Error ? error.message : m.member_management_invite_error())
    } finally {
      setIsInviting(false)
    }
  }, [onInviteMember, resetInviteDialogFeedback, validateInviteForm])

  const handleCreateInviteLink = useCallback(async (): Promise<void> => {
    resetInviteDialogFeedback()

    const invitePayload = validateInviteForm()
    if (!invitePayload) {
      return
    }

    setIsCreatingInviteLink(true)
    try {
      const result = await onCreateInviteLink({
        role: invitePayload.role,
      })

      setGeneratedInviteLink(result.inviteLink)
      await copyTextToClipboard(result.inviteLink)
      setMemberManagementSuccessMessage(m.member_management_invite_link_copied())
    } catch (error) {
      setInviteErrorMessage(error instanceof Error ? error.message : m.member_management_invite_link_error())
    } finally {
      setIsCreatingInviteLink(false)
    }
  }, [onCreateInviteLink, resetInviteDialogFeedback, validateInviteForm])

  const handleCopyGeneratedInviteLink = useCallback(async (): Promise<void> => {
    if (!generatedInviteLink.trim()) {
      return
    }

    setInviteErrorMessage(null)

    try {
      await copyTextToClipboard(generatedInviteLink)
      setMemberManagementSuccessMessage(m.member_management_invite_link_copied())
    } catch (error) {
      setInviteErrorMessage(error instanceof Error ? error.message : m.member_management_invite_link_copy_failed())
    }
  }, [generatedInviteLink])

  /**
   * 打开角色调整弹窗：
   * - 将当前成员角色回填到选择器；
   * - 每次打开前清理旧错误与成功提示，避免跨成员残留。
   */
  const handleOpenRoleDialog = useCallback((member: MemberRecord): void => {
    if (member.role === 'owner') {
      return
    }

    setMemberManagementErrorMessage(null)
    setMemberManagementSuccessMessage(null)
    setUpdateRoleErrorMessage(null)
    setSelectedRoleMember(member)
    setNextRole(member.role === 'admin' ? 'admin' : 'member')
    setIsRoleDialogOpen(true)
  }, [])

  /**
   * 提交角色调整：
   * - active member / invited member 共用同一入口；
   * - 仅在 member -> admin 时做前端 Admin 配额预校验，减少一次无效请求。
   */
  const handleSubmitRoleUpdate = useCallback(async (): Promise<void> => {
    if (!selectedRoleMember) {
      return
    }

    setUpdateRoleErrorMessage(null)
    setMemberManagementErrorMessage(null)
    setMemberManagementSuccessMessage(null)

    if (selectedRoleMember.role === nextRole) {
      setIsRoleDialogOpen(false)
      setSelectedRoleMember(null)
      return
    }

    if (nextRole === 'admin' && selectedRoleMember.role !== 'admin' && adminCount >= adminLimit) {
      setUpdateRoleErrorMessage(
        m.member_management_admin_quota_full_update({
          count: adminCount,
          limit: adminLimit,
        }),
      )
      return
    }

    setIsUpdatingRole(true)
    try {
      const successMessage = await onUpdateMemberRole({
        memberId: selectedRoleMember.id,
        memberStatus: selectedRoleMember.status,
        role: nextRole,
      })

      setMemberManagementSuccessMessage(successMessage)
      setIsRoleDialogOpen(false)
      setSelectedRoleMember(null)
    } catch (error) {
      setUpdateRoleErrorMessage(error instanceof Error ? error.message : m.member_management_role_update_error())
    } finally {
      setIsUpdatingRole(false)
    }
  }, [adminCount, adminLimit, nextRole, onUpdateMemberRole, selectedRoleMember])

  /**
   * 重发邀请：
   * - 直接复用现有 invite 接口；
   * - 服务端会识别 pending invitation 并走 resend 流程。
   */
  const handleResendInvite = useCallback(
    async (member: MemberRecord): Promise<void> => {
      if (member.status !== 'invited' || member.role === 'owner') {
        return
      }

      setInviteErrorMessage(null)
      setMemberManagementErrorMessage(null)
      setMemberManagementSuccessMessage(null)
      setResendingInviteMemberId(member.id)

      try {
        const successMessage = await onInviteMember({
          email: member.email,
          role: member.role === 'admin' ? 'admin' : 'member',
        })
        setMemberManagementSuccessMessage(successMessage)
      } catch (error) {
        setMemberManagementErrorMessage(error instanceof Error ? error.message : m.member_management_resend_error())
      } finally {
        setResendingInviteMemberId(null)
      }
    },
    [onInviteMember],
  )

  return (
    <SettingsSectionShell
      title={m.member_management_title()}
      actions={
        <Button
          type="button"
          variant="dashboardPrimary"
          size="sm"
          disabled={!canManageMembers}
          className="h-8 min-w-[134px] rounded-lg px-4 text-sm font-semibold"
          onClick={() => {
            resetInviteDialogFeedback()
            setInviteMethod('email')
            setIsInviteDialogOpen(true)
          }}
        >
          {m.member_management_add_member()}
        </Button>
      }
    >
      <Card className={`${SETTINGS_SECTION_SURFACE_CLASS_NAME} overflow-hidden`}>
        <CardContent className="p-0">
          <Table className="table-fixed border-collapse">
            <TableHeader className="[&_tr]:border-y [&_tr]:border-[#E5E7EB]">
              <TableRow className="h-8 bg-transparent hover:bg-transparent">
                <TableHead className="w-[40%] px-[15px] text-[12px] leading-[1.6] font-medium text-[#6B7280]">
                  {m.member_management_table_id()}
                </TableHead>
                <TableHead className="w-[14%] px-4 text-[12px] leading-[1.6] font-medium text-[#6B7280]">
                  {m.member_management_table_platforms()}
                </TableHead>
                <TableHead className="w-[18%] px-4 text-[12px] leading-[1.6] font-medium text-[#6B7280]">
                  {m.member_management_table_role()}
                </TableHead>
                <TableHead className="w-[22%] px-4 text-[12px] leading-[1.6] font-medium text-[#6B7280]">
                  {m.member_management_table_recent_activity()}
                </TableHead>
                <TableHead className="w-[6%] px-4 text-right text-[12px] leading-[1.6] font-medium text-[#6B7280]">
                  {m.member_management_table_actions()}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => {
                const removeDisabledReason = getRemoveDisabledReason(currentUserRole, member)
                const roleUpdateDisabledReason = getRoleUpdateDisabledReason(currentUserRole, member)
                const menuHint = getMemberActionMenuHint(currentUserRole, member)
                const memberDisplayName = getMemberDisplayName(member)
                const memberInitials = getMemberInitials(memberDisplayName)
                const removeActionLabel =
                  member.status === 'invited' ? m.member_management_cancel_invite() : m.member_management_remove_member()
                const isResendingInvite = resendingInviteMemberId === member.id
                const canChangeRole = !roleUpdateDisabledReason
                const canRemoveMember = !removeDisabledReason
                const canResendInvite = member.status === 'invited'
                const hasVisibleActions = canChangeRole || canRemoveMember || canResendInvite

                return (
                  <TableRow key={member.id} className="h-[52px] border-b border-[#E5E7EB] bg-white transition-colors hover:bg-[#F8FAFC]">
                    <TableCell className="px-3 py-[10px]">
                      <div className="flex items-center gap-[10px]">
                        <Avatar className="size-8 shrink-0">
                          {member.avatarUrl ? (
                            <AvatarImage
                              src={member.avatarUrl}
                              alt={m.member_management_avatar_alt({
                                name: memberDisplayName,
                              })}
                            />
                          ) : null}
                          <AvatarFallback
                            className="text-[11px] font-semibold text-white"
                            style={{
                              backgroundColor: getAvatarFallbackColor(member.id),
                            }}
                          >
                            {memberInitials}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                          <p className="truncate text-[12px] font-semibold leading-[1.6] text-black">{memberDisplayName}</p>
                          <p className="truncate text-[12px] font-medium leading-[1.6] text-[#6B7280]">{member.email}</p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-[14px]">
                      {member.linkedAccounts.length > 0 ? (
                        <div
                          className="flex items-center gap-2"
                          title={member.linkedAccounts.map((platform) => getPlatformLabel(platform)).join(' / ')}
                        >
                          {member.linkedAccounts.map((platform) => (
                            <span
                              key={`${member.id}-${platform}`}
                              className="member-management-platform-icon"
                              aria-label={getPlatformLabel(platform)}
                            >
                              <PlatformBrandImageIcon
                                src={getPlatformIconSrc(platform)}
                                alt={getPlatformLabel(platform)}
                                className="size-4"
                              />
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[12px] font-medium leading-[1.6] text-[#9CA3AF]">{m.member_management_unlinked()}</span>
                      )}
                    </TableCell>

                    <TableCell className="px-4 py-[14px]">
                      <span
                        className={`inline-flex h-6 min-w-[56px] items-center justify-center rounded-[4px] px-[10px] text-[12px] font-medium leading-[1.6] ${getMemberRoleChipClassName(
                          member.role,
                        )}`}
                      >
                        {getMemberRoleLabel(member.role)}
                      </span>
                    </TableCell>

                    <TableCell className="px-4 py-[14px] text-[12px] font-medium leading-[1.6] text-[#6B7280]">
                      {formatRecentActivityLabel(member.recentActivityAt, member.status)}
                    </TableCell>

                    <TableCell className="px-3 py-[14px] text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            type="button"
                            variant="dashboardTintedGhost"
                            size="icon"
                            className="h-6 w-6"
                            title={m.member_management_actions_title()}
                            aria-label={m.member_management_actions_menu_aria({
                              email: member.email,
                            })}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-[148px] rounded-[8px] border-zinc-200 p-1">
                          {!hasVisibleActions && menuHint ? (
                            <DropdownMenuItem disabled className="px-2 py-1.5 text-[11px] text-zinc-500">
                              {menuHint}
                            </DropdownMenuItem>
                          ) : (
                            <>
                              {canChangeRole ? (
                                <DropdownMenuItem
                                  onSelect={() => {
                                    handleOpenRoleDialog(member)
                                  }}
                                >
                                  <Shield className="mr-2 h-3.5 w-3.5" />
                                  {member.status === 'invited' ? m.member_management_adjust_invite_role() : m.member_management_change_role()}
                                </DropdownMenuItem>
                              ) : null}
                              {canResendInvite ? (
                                <DropdownMenuItem
                                  disabled={!canManageMembers || isResendingInvite}
                                  onSelect={() => {
                                    if (!canManageMembers || isResendingInvite) {
                                      return
                                    }

                                    void handleResendInvite(member)
                                  }}
                                >
                                  <RefreshCcw className="mr-2 h-3.5 w-3.5" />
                                  {isResendingInvite ? m.member_management_resending_invite() : m.member_management_resend_invite()}
                                </DropdownMenuItem>
                              ) : null}
                              {canRemoveMember && (canChangeRole || canResendInvite) ? <DropdownMenuSeparator /> : null}
                              {canRemoveMember ? (
                                <DropdownMenuItem
                                  className="text-sm text-[#DC2626] focus:text-[#DC2626]"
                                  onSelect={() => {
                                    onRemoveMember({
                                      memberId: member.id,
                                      memberStatus: member.status,
                                    })
                                  }}
                                >
                                  <Trash2 className="mr-2 h-3.5 w-3.5" />
                                  {removeActionLabel}
                                </DropdownMenuItem>
                              ) : null}
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {memberActionMessage ? (
        <p className="rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-xs text-zinc-700">{memberActionMessage}</p>
      ) : null}

      {memberManagementErrorMessage ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{memberManagementErrorMessage}</p>
      ) : null}

      {memberManagementSuccessMessage ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
          {memberManagementSuccessMessage}
        </p>
      ) : null}

      <Dialog
        open={isInviteDialogOpen}
        onOpenChange={(open) => {
          setIsInviteDialogOpen(open)

          if (!open) {
            setInviteMethod('email')
            setInviteEmail('')
            setInviteRole('member')
            setInviteErrorMessage(null)
            setGeneratedInviteLink('')
          }
        }}
      >
        <DialogContent className="border-[#e5e7eb] bg-[#f8fafc] p-5 sm:max-w-[520px]">
          <DialogHeader className="gap-1 text-left">
            <DialogTitle className="text-lg font-semibold text-slate-800">{m.member_management_invite_dialog_title()}</DialogTitle>
            <DialogDescription>{m.member_management_invite_dialog_desc()}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label>{m.member_management_invite_mode_label()}</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={inviteMethod === 'email' ? 'dashboardPrimary' : 'dashboardTinted'}
                  className="justify-center"
                  onClick={() => {
                    setInviteMethod('email')
                    setInviteErrorMessage(null)
                    setGeneratedInviteLink('')
                  }}
                >
                  {m.member_management_invite_mode_email()}
                </Button>
                <Button
                  type="button"
                  variant={inviteMethod === 'link' ? 'dashboardPrimary' : 'dashboardTinted'}
                  className="justify-center"
                  onClick={() => {
                    setInviteMethod('link')
                    setInviteErrorMessage(null)
                    setGeneratedInviteLink('')
                  }}
                >
                  {m.member_management_invite_mode_link()}
                </Button>
              </div>
            </div>

            {inviteMethod === 'email' ? (
              <div className="grid gap-2">
                <Label htmlFor="invite-member-email">{m.member_management_email_label()}</Label>
                <Input
                  id="invite-member-email"
                  type="email"
                  placeholder={m.member_management_email_placeholder()}
                  value={inviteEmail}
                  onChange={(event) => {
                    setInviteEmail(event.target.value)
                  }}
                />
              </div>
            ) : (
              <div className="rounded-xl border border-[var(--dashboard-action-tinted-border)] bg-white px-4 py-3 text-xs leading-[1.8] text-[var(--dashboard-text-muted)]">
                {m.member_management_invite_mode_link_hint()}
              </div>
            )}
            <div className="grid gap-2">
              <Label>{m.member_management_role_label()}</Label>
              <Select
                value={inviteRole}
                onValueChange={(value) => {
                  const nextValue: EditableMemberRole = value === 'admin' ? 'admin' : 'member'
                  setInviteRole(nextValue)
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={m.member_management_role_placeholder()} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin" disabled={adminCount >= adminLimit}>
                    {m.role_admin()}
                  </SelectItem>
                  <SelectItem value="member">{m.role_member()}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {inviteMethod === 'link' && generatedInviteLink ? (
              <div className="space-y-2 rounded-xl border border-[var(--dashboard-action-tinted-border)] bg-white p-3">
                <div className="flex items-center gap-2 text-[12px] font-medium leading-[1.6] text-[var(--dashboard-title-text)]">
                  <Link2 className="h-3.5 w-3.5 text-[var(--dashboard-action-tinted-fg)]" />
                  {m.member_management_invite_link_label()}
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    readOnly
                    value={generatedInviteLink}
                    className="font-mono text-[12px]"
                  />
                  <Button
                    type="button"
                    variant="dashboardTinted"
                    className="shrink-0"
                    onClick={() => {
                      void handleCopyGeneratedInviteLink()
                    }}
                  >
                    <Copy className="h-3.5 w-3.5" />
                    {m.member_management_copy_invite_link()}
                  </Button>
                </div>
              </div>
            ) : null}
          </div>

          {inviteErrorMessage ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{inviteErrorMessage}</p>
          ) : null}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="dashboardTinted" disabled={isInviting || isCreatingInviteLink}>
                {m.common_cancel()}
              </Button>
            </DialogClose>
            {inviteMethod === 'link' ? (
              <Button
                type="button"
                variant="dashboardPrimary"
                disabled={isInviting || isCreatingInviteLink}
                onClick={() => {
                  void handleCreateInviteLink()
                }}
              >
                {isCreatingInviteLink ? m.member_management_invite_link_generating() : m.member_management_generate_invite_link()}
              </Button>
            ) : (
              <Button
                type="button"
                variant="dashboardPrimary"
                disabled={isInviting || isCreatingInviteLink}
                onClick={() => {
                  void handleSendInvite()
                }}
              >
                {isInviting ? m.member_management_sending_invite() : m.member_management_send_invite()}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isRoleDialogOpen}
        onOpenChange={(open) => {
          setIsRoleDialogOpen(open)
          if (!open) {
            setSelectedRoleMember(null)
            setUpdateRoleErrorMessage(null)
          }
        }}
      >
        <DialogContent className="border-[#e5e7eb] bg-[#f8fafc] p-5 sm:max-w-[520px]">
          <DialogHeader className="gap-1 text-left">
            <DialogTitle className="text-lg font-semibold text-slate-800">
              {selectedRoleMember?.status === 'invited' ? m.member_management_adjust_invite_role() : m.member_management_change_role()}
            </DialogTitle>
            <DialogDescription>
              {selectedRoleMember
                ? m.member_management_role_dialog_desc({
                    email: selectedRoleMember.email,
                    role: getMemberRoleLabel(selectedRoleMember.role),
                  })
                : m.member_management_role_dialog_empty_desc()}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {selectedRoleMember ? getMemberDisplayName(selectedRoleMember) : m.member_management_fallback_name()}
                  </p>
                  <p className="truncate text-xs text-zinc-500">{selectedRoleMember?.email || '--'}</p>
                </div>

                <span className="rounded-full border border-[#E5E7EB] bg-[#F8FAFC] px-2 py-1 text-[11px] font-medium text-zinc-600">
                  {selectedRoleMember ? getMemberStatusLabel(selectedRoleMember.status) : '--'}
                </span>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>{m.member_management_role_label()}</Label>
              <Select
                value={nextRole}
                onValueChange={(value) => {
                  const normalizedRole: EditableMemberRole = value === 'admin' ? 'admin' : 'member'
                  setNextRole(normalizedRole)
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={m.member_management_role_placeholder()} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin" disabled={isAdminRoleOptionDisabled}>
                    {m.role_admin()}
                  </SelectItem>
                  <SelectItem value="member">{m.role_member()}</SelectItem>
                </SelectContent>
              </Select>
              {isAdminRoleOptionDisabled ? <p className="text-xs text-zinc-500">{m.member_management_admin_quota_hint()}</p> : null}
            </div>
          </div>

          {updateRoleErrorMessage ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{updateRoleErrorMessage}</p>
          ) : null}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="dashboardTinted" disabled={isUpdatingRole}>
                {m.common_cancel()}
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="dashboardPrimary"
              disabled={isUpdatingRole || !selectedRoleMember}
              onClick={() => {
                void handleSubmitRoleUpdate()
              }}
            >
              {isUpdatingRole ? m.common_saving() : m.member_management_save_role()}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SettingsSectionShell>
  )
}
