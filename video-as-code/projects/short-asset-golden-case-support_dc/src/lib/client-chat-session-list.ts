type BuildClientChatSessionListOptions = {
  dbSessionIdList: string[];
  pendingReplySessionIdList: string[];
  selectedSessionId: string;
};

function appendMissingSessionIds(
  baseSessionIdList: string[],
  extraSessionIdList: string[],
): string[] {
  const seenSessionIdSet: Set<string> = new Set();
  const nextSessionIdList: string[] = [];

  /**
   * 基础列表来自后端分页结果，先按原顺序做一遍 trim + 去重：
   * - 保留服务端给出的相对顺序；
   * - 避免空字符串或带空格的 sessionId 混入后续比较。
   */
  for (const sessionId of baseSessionIdList) {
    const normalizedSessionId: string = sessionId.trim();
    if (!normalizedSessionId || seenSessionIdSet.has(normalizedSessionId)) {
      continue;
    }

    seenSessionIdSet.add(normalizedSessionId);
    nextSessionIdList.push(normalizedSessionId);
  }

  /**
   * 这里显式只做“补齐缺失项”：
   * - 后端返回的列表顺序应当被视为主排序依据；
   * - 额外 session（例如 pending reply 或当前详情页里的旧会话）只在缺失时追加；
   * - 这样不会因为 UI 状态把已有会话重新插到顶部。
   */
  for (const sessionId of extraSessionIdList) {
    const normalizedSessionId: string = sessionId.trim();
    if (!normalizedSessionId || seenSessionIdSet.has(normalizedSessionId)) {
      continue;
    }

    seenSessionIdSet.add(normalizedSessionId);
    nextSessionIdList.push(normalizedSessionId);
  }

  return nextSessionIdList;
}

export function buildClientChatSessionList(
  options: BuildClientChatSessionListOptions,
): string[] {
  const {
    dbSessionIdList,
    pendingReplySessionIdList,
    selectedSessionId,
  } = options;
  const stableSessionIdList: string[] = appendMissingSessionIds(
    dbSessionIdList,
    pendingReplySessionIdList,
  );
  const normalizedSelectedSessionId: string = selectedSessionId.trim();

  if (!normalizedSelectedSessionId) {
    return stableSessionIdList;
  }

  return appendMissingSessionIds(stableSessionIdList, [
    normalizedSelectedSessionId,
  ]);
}
