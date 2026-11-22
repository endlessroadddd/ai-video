// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CompanySelectionPrompt } from '@/components/company-selection-prompt'

describe('company-selection-prompt', () => {
  it('应渲染传入的提示文案', () => {
    render(<CompanySelectionPrompt message="请先选择公司" />)

    expect(screen.getByText('请先选择公司')).not.toBeNull()
  })

  it('应暴露布局与密度标记，便于页面复用统一样式', () => {
    const { container } = render(
      <CompanySelectionPrompt
        message="请先在顶部选择公司后继续"
        layout="centered"
        density="compact"
      />,
    )

    const rootElement = container.firstElementChild as HTMLDivElement | null

    expect(rootElement?.dataset.layout).toBe('centered')
    expect(rootElement?.dataset.density).toBe('compact')
    expect(rootElement?.className).toContain('dashboard-company-selection-prompt')
  })
})
