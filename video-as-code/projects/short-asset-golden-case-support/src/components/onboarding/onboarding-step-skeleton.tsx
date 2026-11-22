import { Skeleton } from '@/components/ui/skeleton'

/**
 * onboarding 公司信息步骤骨架：
 * - 保留标题、说明、三段表单和主 CTA 的空间关系；
 * - 让首帧加载时就接近最终版式，避免卡片内部大面积留白。
 */
export function OnboardingCompanyInfoSkeleton() {
  return (
    <div className="space-y-5">
      <div className="space-y-3 text-center">
        <Skeleton className="dashboard-skeleton--base mx-auto h-10 w-[58%] rounded-[12px]" />
        <Skeleton className="dashboard-skeleton--soft mx-auto h-4 w-[72%] rounded-[6px]" />
      </div>

      <div className="space-y-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={`onboarding-company-field-${index}`} className="space-y-2">
            <Skeleton className="dashboard-skeleton--base h-4 w-[92px] rounded-[4px]" />
            <Skeleton
              className={`dashboard-skeleton--soft w-full rounded-[12px] ${index === 2 ? 'h-[108px]' : 'h-11'}`}
            />
          </div>
        ))}
      </div>

      <Skeleton className="dashboard-skeleton--accent h-11 w-full rounded-[12px]" />
    </div>
  )
}

/**
 * onboarding 个人资料步骤骨架：
 * - 复刻头像、上传入口、昵称输入线和主按钮；
 * - settings 页也复用同一形态，保证资料页加载体验一致。
 */
export function OnboardingUserProfileSkeleton() {
  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto flex w-[120px] flex-col items-center gap-3">
        <Skeleton className="dashboard-skeleton--strong h-[120px] w-[120px] rounded-full" />
        <Skeleton className="dashboard-skeleton--soft h-8 w-[104px] rounded-[8px]" />
      </div>

      <Skeleton className="dashboard-skeleton--base mt-8 h-4 w-[132px] rounded-[4px]" />

      <div className="mx-auto mt-4 w-full max-w-[290px] space-y-3">
        <Skeleton className="dashboard-skeleton--accent h-11 w-full rounded-[12px]" />
        <Skeleton className="dashboard-skeleton--soft mx-auto h-3 w-[74%] rounded-[4px]" />
      </div>

      <Skeleton className="dashboard-skeleton--accent mx-auto mt-12 h-12 w-full max-w-[364px] rounded-xl" />
    </div>
  )
}
