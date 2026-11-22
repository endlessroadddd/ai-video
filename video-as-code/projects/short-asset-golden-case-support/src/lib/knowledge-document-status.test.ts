import { describe, expect, it } from 'vitest'

import { normalizeFailedChunkDetails } from '@/lib/knowledge-document-status'
import type { DocumentStatusResponse } from '@/lib/services/knowledge-api'

describe('normalizeFailedChunkDetails', () => {
  it('应提取 snake_case 失败 chunk 明细', () => {
    const documentStatus = {
      id: 'doc-1',
      company_id: 'company-1',
      file_name: 'guide.pdf',
      file_hash: 'hash',
      file_size: 1024,
      file_type: 'application/pdf',
      status: 'failed',
      chunk_progress: {
        failed_chunk_details: [
          {
            chunk_id: 'chunk-1',
            error_message: 'embedding timeout',
            chunk_index: 3,
            heading: 'Install',
            extraction_status: 'failed',
            extraction_attempts: 2,
            last_extracted_at: '2026-03-16T12:00:00Z',
          },
        ],
      },
    } satisfies DocumentStatusResponse

    expect(normalizeFailedChunkDetails(documentStatus)).toEqual([
      {
        chunkId: 'chunk-1',
        errorMessage: 'embedding timeout',
        chunkIndex: 3,
        heading: 'Install',
        status: 'failed',
        extractionAttempts: 2,
        lastExtractedAt: '2026-03-16T12:00:00Z',
      },
    ])
  })

  it('应兼容 camelCase 并过滤无效 chunk', () => {
    const documentStatus = {
      id: 'doc-2',
      company_id: 'company-1',
      file_name: 'guide.pdf',
      file_hash: 'hash',
      file_size: 1024,
      file_type: 'application/pdf',
      status: 'failed',
      chunk_progress: {
        failed_chunk_details: [
          {
            chunkId: 'chunk-2',
            error: 'rate limited',
            chunkIndex: '8',
            title: 'FAQ',
            status: 'failed',
            extractionAttempts: '4',
            lastExtractedAt: '2026-03-16T13:00:00Z',
          },
          {
            error_message: 'missing chunk id',
          },
        ],
      },
    } satisfies DocumentStatusResponse

    expect(normalizeFailedChunkDetails(documentStatus)).toEqual([
      {
        chunkId: 'chunk-2',
        errorMessage: 'rate limited',
        chunkIndex: 8,
        heading: 'FAQ',
        status: 'failed',
        extractionAttempts: 4,
        lastExtractedAt: '2026-03-16T13:00:00Z',
      },
    ])
  })

  it('应按 chunkId 去重，避免重复勾选项', () => {
    const documentStatus = {
      id: 'doc-3',
      company_id: 'company-1',
      file_name: 'guide.pdf',
      file_hash: 'hash',
      file_size: 1024,
      file_type: 'application/pdf',
      status: 'failed',
      chunk_progress: {
        failed_chunk_details: [
          {
            chunk_id: 'chunk-3',
            error_message: 'first error',
          },
          {
            chunk_id: 'chunk-3',
            error_message: 'duplicate error',
          },
        ],
      },
    } satisfies DocumentStatusResponse

    expect(normalizeFailedChunkDetails(documentStatus)).toEqual([
      {
        chunkId: 'chunk-3',
        errorMessage: 'first error',
        chunkIndex: null,
        heading: null,
        status: null,
        extractionAttempts: null,
        lastExtractedAt: null,
      },
    ])
  })
})
