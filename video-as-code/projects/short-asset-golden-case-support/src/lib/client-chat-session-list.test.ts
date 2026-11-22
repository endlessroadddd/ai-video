import { describe, expect, it } from "vitest";

import { buildClientChatSessionList } from "@/lib/client-chat-session-list";

describe("client-chat-session-list", () => {
  it("当前选中的会话已存在时应保持后端原始顺序", () => {
    expect(
      buildClientChatSessionList({
        dbSessionIdList: ["session-1", "session-2", "session-3"],
        pendingReplySessionIdList: [],
        selectedSessionId: "session-2",
      }),
    ).toEqual(["session-1", "session-2", "session-3"]);
  });

  it("pending reply 会话已存在时不应被提前到列表前部", () => {
    expect(
      buildClientChatSessionList({
        dbSessionIdList: ["session-1", "session-2", "session-3"],
        pendingReplySessionIdList: ["session-3", "session-1"],
        selectedSessionId: "",
      }),
    ).toEqual(["session-1", "session-2", "session-3"]);
  });

  it("仅把缺失的 pending 与当前会话补到列表末尾", () => {
    expect(
      buildClientChatSessionList({
        dbSessionIdList: ["session-1", "session-2"],
        pendingReplySessionIdList: ["session-3", "session-2"],
        selectedSessionId: "session-4",
      }),
    ).toEqual(["session-1", "session-2", "session-3", "session-4"]);
  });
});
