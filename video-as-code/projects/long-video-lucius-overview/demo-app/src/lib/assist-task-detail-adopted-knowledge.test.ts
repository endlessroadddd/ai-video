import { describe, expect, it } from 'vitest'

import { resolveAdoptedKnowledgePopoverPlacement } from '@/lib/assist-task-detail-adopted-knowledge'

describe('assist-task-detail-adopted-knowledge', () => {
  it('空间充足时应优先展示在触发器下方', () => {
    expect(
      resolveAdoptedKnowledgePopoverPlacement({
        sectionClientHeight: 720,
        sectionClientWidth: 900,
        sectionScrollTop: 0,
        triggerOffsetTop: 120,
        triggerOffsetBottom: 138,
        triggerOffsetRight: 520,
      }),
    ).toEqual({
      top: 148,
      left: 55,
      width: 489,
    })
  })

  it('底部空间不足时应翻转到触发器上方', () => {
    expect(
      resolveAdoptedKnowledgePopoverPlacement({
        sectionClientHeight: 640,
        sectionClientWidth: 900,
        sectionScrollTop: 240,
        triggerOffsetTop: 520,
        triggerOffsetBottom: 538,
        triggerOffsetRight: 520,
      }),
    ).toEqual({
      top: 428,
      left: 55,
      width: 489,
    })
  })

  it('窄屏时宽度应自动收缩并限制在面板内', () => {
    expect(
      resolveAdoptedKnowledgePopoverPlacement({
        sectionClientHeight: 720,
        sectionClientWidth: 320,
        sectionScrollTop: 0,
        triggerOffsetTop: 180,
        triggerOffsetBottom: 198,
        triggerOffsetRight: 260,
      }),
    ).toEqual({
      top: 208,
      left: 12,
      width: 296,
    })
  })
})
