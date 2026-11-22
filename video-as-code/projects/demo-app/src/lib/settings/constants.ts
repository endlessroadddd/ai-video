/**
 * settings 默认一级分区：
 * - 用户访问 `/settings` 时，统一先进入“工作群设置”；
 * - Header 等其它入口也复用同一常量，避免默认页配置分叉。
 */
export const DEFAULT_SETTINGS_SECTION_ID = 'workspace-integration' as const
