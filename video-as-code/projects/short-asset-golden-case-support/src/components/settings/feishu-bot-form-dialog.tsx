import { useEffect, useId, useState, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import type {
  CreateFeishuBotPayload,
  FeishuBotRecord,
  UpdateFeishuBotPayload,
} from '@/lib/services/feishu-integration-api'
import { m } from '@/paraglide/messages'

import {
  buildFeishuBotFormSubmission,
  createFeishuBotFormDraft,
  type FeishuBotFormDraft,
  type FeishuBotFormMode,
} from './feishu-integration-panel.utils'

type FeishuBotFormDialogProps = {
  mode: FeishuBotFormMode
  open: boolean
  companyId: string | null
  bot: FeishuBotRecord | null
  pending: boolean
  submitError: string | null
  onOpenChange: (open: boolean) => void
  onSubmit: (payload: CreateFeishuBotPayload | UpdateFeishuBotPayload) => Promise<void> | void
}

/**
 * Bot 表单弹窗职责：
 * - create / edit 共用同一套布局与字段校验；
 * - edit 模式不回显 secret，只在显式打开 rotate 区块后才允许替换。
 */
export function FeishuBotFormDialog(props: FeishuBotFormDialogProps) {
  const {
    mode,
    open,
    companyId,
    bot,
    pending,
    submitError,
    onOpenChange,
    onSubmit,
  } = props
  const [draft, setDraft] = useState<FeishuBotFormDraft>(() => createFeishuBotFormDraft(mode, bot))
  const [localError, setLocalError] = useState<string | null>(null)
  const nameFieldId = useId()
  const appIdFieldId = useId()
  const appSecretFieldId = useId()
  const isDefaultFieldId = useId()
  const enabledFieldId = useId()
  const rotatedSecretFieldId = useId()

  useEffect(() => {
    if (!open) {
      setLocalError(null)
      return
    }

    setDraft(createFeishuBotFormDraft(mode, bot))
    setLocalError(null)
  }, [bot, mode, open])

  const setDraftField = <Key extends keyof FeishuBotFormDraft>(field: Key, value: FeishuBotFormDraft[Key]): void => {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [field]: value,
    }))
    setLocalError(null)
  }

  const validateDraft = (): string | null => {
    if (!companyId) {
      return m.workspace_select_company_error()
    }

    if (!draft.name.trim()) {
      return m.feishu_bot_form_name_required()
    }

    if (mode === 'create' && !draft.appId.trim()) {
      return m.feishu_bot_form_app_id_required()
    }

    if (mode === 'create' && !draft.appSecret.trim()) {
      return m.feishu_bot_form_app_secret_required()
    }

    if (mode === 'edit' && draft.rotateSecret && !draft.rotatedSecret.trim()) {
      return m.feishu_bot_form_rotated_secret_required()
    }

    return null
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    const validationMessage = validateDraft()
    if (validationMessage) {
      setLocalError(validationMessage)
      return
    }

    const payload = buildFeishuBotFormSubmission({
      mode,
      companyId: companyId || '',
      bot,
      draft,
    })

    await onSubmit(payload)
  }

  const title = mode === 'create' ? m.feishu_bot_dialog_create_title() : m.feishu_bot_dialog_edit_title()
  const primaryActionLabel = pending
    ? m.feishu_bot_form_submitting()
    : mode === 'create'
      ? m.feishu_bot_create()
      : m.common_save()
  const resolvedError = localError || submitError

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[560px] border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)] p-5 sm:max-w-[560px]">
        <DialogHeader className="gap-1 text-left">
          <DialogTitle className="text-lg font-semibold text-[var(--dashboard-title-text)]">
            {title}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={(event) => void handleSubmit(event)}>
          <section className="space-y-4 rounded-2xl border border-[var(--dashboard-panel-border)] bg-[var(--dashboard-panel-bg)] p-4">
            <div className="space-y-2">
              <Label htmlFor={nameFieldId}>{m.feishu_bot_form_name_label()}</Label>
              <Input
                id={nameFieldId}
                value={draft.name}
                placeholder={m.feishu_bot_form_name_placeholder()}
                onChange={(event) => {
                  setDraftField('name', event.currentTarget.value)
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={appIdFieldId}>{m.feishu_bot_form_app_id_label()}</Label>
              <Input
                id={appIdFieldId}
                value={draft.appId}
                placeholder={m.feishu_bot_form_app_id_placeholder()}
                readOnly={mode === 'edit'}
                disabled={mode === 'edit'}
                onChange={(event) => {
                  setDraftField('appId', event.currentTarget.value)
                }}
              />
            </div>

            {mode === 'create' ? (
              <div className="space-y-2">
                <Label htmlFor={appSecretFieldId}>{m.feishu_bot_form_app_secret_label()}</Label>
                <Input
                  id={appSecretFieldId}
                  type="password"
                  value={draft.appSecret}
                  placeholder={m.feishu_bot_form_app_secret_placeholder()}
                  onChange={(event) => {
                    setDraftField('appSecret', event.currentTarget.value)
                  }}
                />
              </div>
            ) : null}

            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex items-center justify-between rounded-xl border border-[var(--dashboard-panel-border)] bg-[var(--dashboard-soft-surface)] px-3 py-2.5">
                <div className="space-y-1">
                  <Label htmlFor={isDefaultFieldId}>{m.feishu_bot_form_default_label()}</Label>
                </div>
                <Switch
                  id={isDefaultFieldId}
                  checked={draft.isDefault}
                  onCheckedChange={(checked) => {
                    setDraftField('isDefault', checked)
                  }}
                />
              </div>

              {mode === 'edit' ? (
                <div className="flex items-center justify-between rounded-xl border border-[var(--dashboard-panel-border)] bg-[var(--dashboard-soft-surface)] px-3 py-2.5">
                  <div className="space-y-1">
                    <Label htmlFor={enabledFieldId}>{m.feishu_bot_form_enabled_label()}</Label>
                  </div>
                  <Switch
                    id={enabledFieldId}
                    checked={draft.enabled}
                    onCheckedChange={(checked) => {
                      setDraftField('enabled', checked)
                    }}
                  />
                </div>
              ) : null}
            </div>
          </section>

          {mode === 'edit' ? (
            <section className="space-y-3 rounded-2xl border border-[var(--dashboard-panel-border)] bg-[var(--dashboard-soft-surface)] p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-[var(--dashboard-title-text)]">
                    {m.feishu_bot_form_rotate_secret_label()}
                  </p>
                  <p className="text-xs text-[var(--dashboard-text-muted)]">
                    {m.feishu_bot_form_rotate_secret_hint()}
                  </p>
                </div>

                <Button
                  type="button"
                  variant="dashboardTinted"
                  size="sm"
                  className="rounded-lg"
                  onClick={() => {
                    const nextRotateSecret = !draft.rotateSecret
                    setDraft((currentDraft) => ({
                      ...currentDraft,
                      rotateSecret: nextRotateSecret,
                      rotatedSecret: nextRotateSecret ? currentDraft.rotatedSecret : '',
                    }))
                    setLocalError(null)
                  }}
                >
                  {draft.rotateSecret ? m.feishu_bot_form_rotate_secret_hide() : m.feishu_bot_form_rotate_secret_show()}
                </Button>
              </div>

              {draft.rotateSecret ? (
                <div className="space-y-2">
                  <Label htmlFor={rotatedSecretFieldId}>{m.feishu_bot_form_rotated_secret_label()}</Label>
                  <Input
                    id={rotatedSecretFieldId}
                    type="password"
                    value={draft.rotatedSecret}
                    placeholder={m.feishu_bot_form_rotated_secret_placeholder()}
                    onChange={(event) => {
                      setDraftField('rotatedSecret', event.currentTarget.value)
                    }}
                  />
                </div>
              ) : null}
            </section>
          ) : null}

          {resolvedError ? (
            <div className="rounded-xl border border-[var(--dashboard-danger-border)] bg-[var(--dashboard-danger-bg)] px-3 py-2 text-sm text-[var(--dashboard-danger-text)]">
              {resolvedError}
            </div>
          ) : null}

          <DialogFooter className="pt-1">
            <Button
              type="button"
              variant="dashboardTinted"
              disabled={pending}
              onClick={() => {
                onOpenChange(false)
              }}
            >
              {m.common_cancel()}
            </Button>
            <Button type="submit" variant="dashboardPrimary" disabled={pending}>
              {primaryActionLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
