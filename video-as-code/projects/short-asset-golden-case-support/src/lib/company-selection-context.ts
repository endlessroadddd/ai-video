import type { QueryClient } from '@tanstack/react-query'

import { setSelectedCompanyId } from '@/lib/company-selection'
import {
  companyKeys,
  upsertUserCompany,
  type UserCompany,
} from '@/lib/services/company-membership-query'

type ActivateSelectedCompanyContextPayload = {
  companyId: string
  queryClient?: QueryClient | null
  company?: UserCompany | null
}

/**
 * 切换当前生效公司上下文：
 * - 若已知目标公司的最小信息，先把它补进 React Query 公司列表缓存；
 * - 若当前只是“切到已知公司”或“邀请流刚加入新公司”，不要立刻失效公司列表查询；
 * - 否则后台 refetch 可能先返回旧列表，把刚写入的新公司从缓存里冲掉；
 * - 最后才广播 selected company_id，避免监听方先读到旧列表后把新公司误判为无效。
 */
export function activateSelectedCompanyContext(
  payload: ActivateSelectedCompanyContextPayload,
): void {
  const { companyId, queryClient = null, company = null } = payload

  if (queryClient && company) {
    queryClient.setQueryData<UserCompany[]>(companyKeys.byCurrentUser(), (currentCompanies = []) =>
      upsertUserCompany(currentCompanies, company),
    )
  }

  if (queryClient && !company) {
    void queryClient.invalidateQueries({
      queryKey: companyKeys.byCurrentUser(),
    })
  }

  setSelectedCompanyId(companyId)
}
