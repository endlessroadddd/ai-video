import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query'

import {
  createKnowledge,
  deleteKnowledge,
  getDocumentStatus,
  getKnowledgeById,
  listKnowledge,
  listKnowledgeDocuments,
  searchKnowledge,
  updateKnowledge,
  uploadKnowledgeFile,
  type CreateKnowledgeRequest,
  type CreateKnowledgeResponse,
  type DeleteKnowledgeRequest,
  type DeleteKnowledgeResponse,
  type DocumentStatusResponse,
  type KnowledgeDetailResponse,
  type KnowledgeDocumentsResponse,
  type KnowledgeListResponse,
  type ListKnowledgeDocumentsParams,
  type SearchKnowledgeRequest,
  type SearchKnowledgeResponse,
  type UpdateKnowledgeRequest,
  type UpdateKnowledgeResponse,
  type UploadKnowledgeFileRequest,
  type UploadKnowledgeResponse,
  type ListKnowledgeParams,
} from './knowledge-api'

/**
 * Knowledge API 的统一 Query Key。
 *
 * 约定：
 * - 所有外部微服务接口统一以 `svc` 前缀隔离。
 * - `knowledge` 作为业务域前缀，避免与其它服务 key 冲突。
 */
export const knowledgeKeys = {
  all: ['svc', 'knowledge'] as const,
  list: (params: ListKnowledgeParams) => [...knowledgeKeys.all, 'list', params] as const,
  detail: (knowledgeId: string) => [...knowledgeKeys.all, 'detail', knowledgeId] as const,
  search: (payload: SearchKnowledgeRequest) => [...knowledgeKeys.all, 'search', payload] as const,
  documents: (params: ListKnowledgeDocumentsParams) => [...knowledgeKeys.all, 'documents', params] as const,
  documentStatus: (documentId: string) => [...knowledgeKeys.all, 'document-status', documentId] as const,
}

export function useKnowledgeList(
  params: ListKnowledgeParams,
  options?: Omit<
    UseQueryOptions<KnowledgeListResponse, Error, KnowledgeListResponse, ReturnType<typeof knowledgeKeys.list>>,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery({
    queryKey: knowledgeKeys.list(params),
    queryFn: () => listKnowledge(params),
    ...options,
  })
}

export function useKnowledgeDetail(
  knowledgeId: string,
  options?: Omit<
    UseQueryOptions<
      KnowledgeDetailResponse,
      Error,
      KnowledgeDetailResponse,
      ReturnType<typeof knowledgeKeys.detail>
    >,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery({
    queryKey: knowledgeKeys.detail(knowledgeId),
    queryFn: () => getKnowledgeById(knowledgeId),
    enabled: Boolean(knowledgeId),
    ...options,
  })
}

export function useKnowledgeSearch(
  payload: SearchKnowledgeRequest,
  options?: Omit<
    UseQueryOptions<
      SearchKnowledgeResponse,
      Error,
      SearchKnowledgeResponse,
      ReturnType<typeof knowledgeKeys.search>
    >,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery({
    queryKey: knowledgeKeys.search(payload),
    queryFn: () => searchKnowledge(payload),
    ...options,
  })
}

export function useKnowledgeDocuments(
  params: ListKnowledgeDocumentsParams,
  options?: Omit<
    UseQueryOptions<
      KnowledgeDocumentsResponse,
      Error,
      KnowledgeDocumentsResponse,
      ReturnType<typeof knowledgeKeys.documents>
    >,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery({
    queryKey: knowledgeKeys.documents(params),
    queryFn: () => listKnowledgeDocuments(params),
    enabled: Boolean(params.company_id),
    ...options,
  })
}

export function useDocumentStatus(
  documentId: string,
  options?: Omit<
    UseQueryOptions<
      DocumentStatusResponse,
      Error,
      DocumentStatusResponse,
      ReturnType<typeof knowledgeKeys.documentStatus>
    >,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery({
    queryKey: knowledgeKeys.documentStatus(documentId),
    queryFn: () => getDocumentStatus(documentId),
    enabled: Boolean(documentId),
    ...options,
  })
}

/**
 * 创建知识 mutation。
 *
 * 默认行为：
 * - 成功后失效全部 `knowledge` 相关缓存。
 */
export function useCreateKnowledge(
  options?: UseMutationOptions<CreateKnowledgeResponse, Error, CreateKnowledgeRequest>,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => createKnowledge(payload),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: knowledgeKeys.all })
      await options?.onSuccess?.(...args)
    },
    ...options,
  })
}

/**
 * 更新知识 mutation。
 */
export function useUpdateKnowledge(
  options?: UseMutationOptions<UpdateKnowledgeResponse, Error, UpdateKnowledgeRequest>,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => updateKnowledge(payload),
    onSuccess: async (...args) => {
      // 不阻塞 mutation 完成态，避免页面交互（如关闭弹窗）被延后。
      void queryClient.invalidateQueries({ queryKey: knowledgeKeys.all })
      await options?.onSuccess?.(...args)
    },
    ...options,
  })
}

/**
 * 删除知识 mutation。
 */
export function useDeleteKnowledge(
  options?: UseMutationOptions<DeleteKnowledgeResponse, Error, DeleteKnowledgeRequest>,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => deleteKnowledge(payload),
    onSuccess: async (...args) => {
      // 删除后统一失效知识相关缓存，确保列表和详情同步刷新。
      void queryClient.invalidateQueries({ queryKey: knowledgeKeys.all })
      await options?.onSuccess?.(...args)
    },
    ...options,
  })
}

/**
 * 上传知识文件 mutation。
 */
export function useUploadKnowledgeFile(
  options?: UseMutationOptions<UploadKnowledgeResponse, Error, UploadKnowledgeFileRequest>,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => uploadKnowledgeFile(payload),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: knowledgeKeys.all })
      await options?.onSuccess?.(...args)
    },
    ...options,
  })
}
