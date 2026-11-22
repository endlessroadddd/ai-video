import { cn } from '@/lib/utils'

type KnowledgeFileTypeIconProps = {
  fileName: string
  className?: string
}

type FileTypeVisualConfig = {
  label: string
  color: string
}

const DEFAULT_FILE_TYPE_CONFIG: FileTypeVisualConfig = {
  label: 'FILE',
  color: '#64748B',
}

const FILE_TYPE_CONFIG_MAP: Record<string, FileTypeVisualConfig> = {
  pdf: { label: 'PDF', color: '#EF4444' },
  doc: { label: 'DOC', color: '#6366F1' },
  docx: { label: 'DOC', color: '#6366F1' },
  txt: { label: 'TXT', color: '#1F2937' },
  md: { label: 'MD', color: '#0EA5E9' },
  markdown: { label: 'MD', color: '#0EA5E9' },
}

/**
 * 从文件名中提取扩展名。
 * 这里统一转小写，避免后端返回大写扩展名时出现样式错配。
 */
function getFileExtension(fileName: string): string {
  const lastDotIndex = fileName.lastIndexOf('.')
  if (lastDotIndex < 0 || lastDotIndex === fileName.length - 1) {
    return ''
  }

  return fileName.slice(lastDotIndex + 1).trim().toLowerCase()
}

export function KnowledgeFileTypeIcon(props: KnowledgeFileTypeIconProps) {
  const { fileName, className } = props
  const extension = getFileExtension(fileName)
  const visualConfig =
    FILE_TYPE_CONFIG_MAP[extension] || DEFAULT_FILE_TYPE_CONFIG

  return (
    <span
      className={cn(
        'relative inline-flex h-8 w-7 shrink-0 overflow-hidden rounded-[6px] border border-[#E2E8F0] bg-white',
        className,
      )}
      aria-hidden
    >
      <span className="absolute right-0 top-0 h-0 w-0 border-b-[9px] border-l-[9px] border-b-[#F8FAFC] border-l-transparent" />
      <span
        className="absolute inset-x-0 bottom-0 inline-flex h-4 items-center justify-center text-[8px] font-semibold leading-none text-white"
        style={{ backgroundColor: visualConfig.color }}
      >
        {visualConfig.label}
      </span>
    </span>
  )
}
