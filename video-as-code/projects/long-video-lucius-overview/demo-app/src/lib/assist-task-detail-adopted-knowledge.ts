export type ResolveAdoptedKnowledgePopoverPlacementParams = {
  sectionClientHeight: number
  sectionClientWidth: number
  sectionScrollTop: number
  triggerOffsetBottom: number
  triggerOffsetRight: number
  triggerOffsetTop: number
}

export type AdoptedKnowledgePopoverPlacement = {
  left: number
  top: number
  width: number
}

const ADOPTED_KNOWLEDGE_POPOVER_PREFERRED_WIDTH = 489
const ADOPTED_KNOWLEDGE_POPOVER_MAX_HEIGHT = 322
const ADOPTED_KNOWLEDGE_POPOVER_HORIZONTAL_ALIGNMENT_OFFSET = 24
const ADOPTED_KNOWLEDGE_POPOVER_HORIZONTAL_INSET = 12
const ADOPTED_KNOWLEDGE_POPOVER_VERTICAL_INSET = 12
const ADOPTED_KNOWLEDGE_POPOVER_TRIGGER_GAP = 10

/**
 * 统一收口 adopted knowledge 浮层定位：
 * - 浮层始终限制在当前消息滚动视口内，避免为了展示浮层再去给列表硬塞底部占位；
 * - 优先放在触发器下方，底部空间不足时翻转到上方；
 * - 超窄屏时允许宽度继续收缩，保证不会溢出详情面板。
 */
export function resolveAdoptedKnowledgePopoverPlacement(
  params: ResolveAdoptedKnowledgePopoverPlacementParams,
): AdoptedKnowledgePopoverPlacement {
  const availableWidth = Math.max(
    params.sectionClientWidth - ADOPTED_KNOWLEDGE_POPOVER_HORIZONTAL_INSET * 2,
    1,
  )
  const width = Math.min(
    ADOPTED_KNOWLEDGE_POPOVER_PREFERRED_WIDTH,
    availableWidth,
  )
  const maxLeft = Math.max(
    params.sectionClientWidth - width - ADOPTED_KNOWLEDGE_POPOVER_HORIZONTAL_INSET,
    ADOPTED_KNOWLEDGE_POPOVER_HORIZONTAL_INSET,
  )
  const preferredLeft =
    params.triggerOffsetRight -
    width +
    ADOPTED_KNOWLEDGE_POPOVER_HORIZONTAL_ALIGNMENT_OFFSET
  const left = Math.min(
    Math.max(preferredLeft, ADOPTED_KNOWLEDGE_POPOVER_HORIZONTAL_INSET),
    maxLeft,
  )

  const viewportTop =
    params.sectionScrollTop + ADOPTED_KNOWLEDGE_POPOVER_VERTICAL_INSET
  const viewportBottom =
    params.sectionScrollTop +
    params.sectionClientHeight -
    ADOPTED_KNOWLEDGE_POPOVER_MAX_HEIGHT -
    ADOPTED_KNOWLEDGE_POPOVER_VERTICAL_INSET
  const preferredTopBelow =
    params.triggerOffsetBottom +
    params.sectionScrollTop +
    ADOPTED_KNOWLEDGE_POPOVER_TRIGGER_GAP
  const preferredTopAbove =
    params.triggerOffsetTop +
    params.sectionScrollTop -
    ADOPTED_KNOWLEDGE_POPOVER_MAX_HEIGHT -
    ADOPTED_KNOWLEDGE_POPOVER_TRIGGER_GAP
  const latestTop = Math.max(viewportBottom, viewportTop)

  if (
    preferredTopBelow + ADOPTED_KNOWLEDGE_POPOVER_MAX_HEIGHT <=
    params.sectionScrollTop +
      params.sectionClientHeight -
      ADOPTED_KNOWLEDGE_POPOVER_VERTICAL_INSET
  ) {
    return {
      top: preferredTopBelow,
      left,
      width,
    }
  }

  if (preferredTopAbove >= viewportTop) {
    return {
      top: preferredTopAbove,
      left,
      width,
    }
  }

  return {
    top: Math.min(Math.max(preferredTopBelow, viewportTop), latestTop),
    left,
    width,
  }
}
