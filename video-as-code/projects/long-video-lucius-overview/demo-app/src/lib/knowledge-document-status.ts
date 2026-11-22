import type { DocumentFailedChunkDetail, DocumentStatusResponse } from '@/lib/services/knowledge-api'

export type FailedChunkDetail = {
  chunkId: string
  errorMessage: string | null
  chunkIndex: number | null
  heading: string | null
  status: string | null
  extractionAttempts: number | null
  lastExtractedAt: string | null
}

function pickTextValue(
  payload: DocumentFailedChunkDetail,
  keys: Array<keyof DocumentFailedChunkDetail>,
): string | null {
  for (const key of keys) {
    const value = payload[key]
    if (typeof value === 'string' && value.trim() !== '') {
      return value.trim()
    }
  }

  return null
}

function pickIntegerValue(
  payload: DocumentFailedChunkDetail,
  keys: Array<keyof DocumentFailedChunkDetail>,
): number | null {
  for (const key of keys) {
    const value = payload[key]

    if (typeof value === 'number' && Number.isFinite(value)) {
      return value
    }

    if (typeof value === 'string' && value.trim() !== '') {
      const parsedValue = Number(value)
      if (Number.isFinite(parsedValue)) {
        return parsedValue
      }
    }
  }

  return null
}

function toFailedChunkDetail(payload: DocumentFailedChunkDetail): FailedChunkDetail | null {
  const chunkId = pickTextValue(payload, ['chunk_id', 'chunkId'])
  if (!chunkId) {
    return null
  }

  return {
    chunkId,
    errorMessage: pickTextValue(payload, ['error_message', 'errorMessage', 'error', 'extraction_error']),
    chunkIndex: pickIntegerValue(payload, ['chunk_index', 'chunkIndex']),
    heading: pickTextValue(payload, ['heading', 'title']),
    status: pickTextValue(payload, ['extraction_status', 'status']),
    extractionAttempts: pickIntegerValue(payload, ['extraction_attempts', 'extractionAttempts']),
    lastExtractedAt: pickTextValue(payload, ['last_extracted_at', 'lastExtractedAt']),
  }
}

/**
 * 将接口里宽松的失败 chunk 结构收敛为前端稳定可渲染的模型。
 * 这里顺带去重，避免后端重复返回相同 chunk 导致勾选态混乱。
 */
export function normalizeFailedChunkDetails(
  documentStatus: DocumentStatusResponse | null | undefined,
): FailedChunkDetail[] {
  const rawFailedChunkDetails = documentStatus?.chunk_progress?.failed_chunk_details
  if (!Array.isArray(rawFailedChunkDetails) || rawFailedChunkDetails.length === 0) {
    return []
  }

  const seenChunkIds = new Set<string>()
  const normalizedFailedChunkDetails: FailedChunkDetail[] = []

  for (const rawFailedChunkDetail of rawFailedChunkDetails) {
    if (!rawFailedChunkDetail || typeof rawFailedChunkDetail !== 'object') {
      continue
    }

    const normalizedFailedChunkDetail = toFailedChunkDetail(rawFailedChunkDetail as DocumentFailedChunkDetail)
    if (!normalizedFailedChunkDetail || seenChunkIds.has(normalizedFailedChunkDetail.chunkId)) {
      continue
    }

    seenChunkIds.add(normalizedFailedChunkDetail.chunkId)
    normalizedFailedChunkDetails.push(normalizedFailedChunkDetail)
  }

  return normalizedFailedChunkDetails
}
