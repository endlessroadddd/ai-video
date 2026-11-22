import { describe, expect, it } from "vitest";

import {
  getClientChatLocationTarget,
  isClientChatDraftRoute,
} from "@/lib/client-chat-route";

describe("client-chat-route", () => {
  it("空 sessionId 应回到新会话路由", () => {
    expect(getClientChatLocationTarget("")).toEqual({
      to: "/chat",
    });
    expect(getClientChatLocationTarget("   ")).toEqual({
      to: "/chat",
    });
    expect(isClientChatDraftRoute(undefined)).toBe(true);
  });

  it("非空 sessionId 应落到详情路由并自动 trim", () => {
    expect(getClientChatLocationTarget("  session-123  ")).toEqual({
      to: "/chat/$sessionId",
      params: {
        sessionId: "session-123",
      },
    });
    expect(isClientChatDraftRoute("session-123")).toBe(false);
  });
});
