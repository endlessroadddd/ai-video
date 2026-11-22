import { describe, expect, it } from 'vitest'

import { canInstallPwaFromOrigin, isStandalonePwa } from '@/lib/pwa'

describe('pwa', () => {
  it('独立窗口模式应兼容 display-mode 与 iOS standalone 字段', () => {
    expect(
      isStandalonePwa({
        matchMedia: () => ({ matches: true }),
      }),
    ).toBe(true)

    expect(
      isStandalonePwa({
        navigator: { standalone: true } as Navigator & { standalone?: boolean },
      }),
    ).toBe(true)

    expect(isStandalonePwa()).toBe(false)
  })

  it('仅允许在 canonical origin 或本地零配置场景暴露安装入口', () => {
    expect(canInstallPwaFromOrigin('http://localhost:3000', null)).toBe(true)
    expect(canInstallPwaFromOrigin('https://app.hirelucius.com', 'https://app.hirelucius.com')).toBe(true)
    expect(canInstallPwaFromOrigin('https://preview.hirelucius.com', 'https://app.hirelucius.com')).toBe(false)
  })
})
