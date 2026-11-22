import { describe, expect, it } from "vitest";

import {
  buildClientChatRecordingTextFrames,
  getClientChatRecordingPromptDelay,
  getClientChatRecordingReplyDelay,
} from "@/lib/client-chat-recording";

describe("client-chat-recording", () => {
  it("batches prompt text into frame-sized updates while preserving the full prompt", () => {
    const prompt = "Ship the review step.";
    const frames = buildClientChatRecordingTextFrames(
      prompt,
      false,
      getClientChatRecordingPromptDelay,
      48,
    );

    expect(frames.length).toBeLessThan(prompt.length);
    expect(frames[0]?.content.length).toBeGreaterThan(1);
    expect(frames.at(-1)?.content).toBe(prompt);
  });

  it("flushes reply frames on hard pauses so sentence timing still reads naturally", () => {
    const reply = "First sentence.\nSecond sentence.";
    const frames = buildClientChatRecordingTextFrames(
      reply,
      false,
      getClientChatRecordingReplyDelay,
      56,
    );

    expect(frames.some((frame) => frame.content.endsWith(".\n"))).toBe(true);
    expect(frames.at(-1)?.content).toBe(reply);
  });

  it("collapses to a single frame for reduced motion playback", () => {
    const reply = "Keep it immediate.";
    const frames = buildClientChatRecordingTextFrames(
      reply,
      true,
      getClientChatRecordingReplyDelay,
      56,
    );

    expect(frames).toEqual([
      {
        content: reply,
        delayMs: 0,
      },
    ]);
  });
});
