import { useEffect, useState } from "react";

import { GlobalKnowledgeUploadWidget } from "@/components/dashboard/GlobalKnowledgeUploadWidget";
import {
  type ClientChatRecordingCameraState,
  type ClientChatRecordingLayoutState,
  type ClientChatRecordingScenario,
} from "@/lib/client-chat-recording";
import { ClientChatPage } from "@/routes/dashboard.client-chat";

type ClientChatRouteShellProps = {
  recordingScenario?: ClientChatRecordingScenario | null;
  routeSessionId?: string | null;
};

/**
 * 统一 chat 路由的外层承载：
 * - `/chat` 与 `/chat/$sessionId` 复用同一套主区域布局；
 * - session 差异只通过 `routeSessionId` 传给聊天页内部处理。
 */
export function ClientChatRouteShell(props: ClientChatRouteShellProps) {
  const { recordingScenario = null, routeSessionId = null } = props;
  const [recordingCameraState, setRecordingCameraState] =
    useState<ClientChatRecordingCameraState>("wide");
  const [recordingLayoutState, setRecordingLayoutState] =
    useState<ClientChatRecordingLayoutState>("docked");

  useEffect(() => {
    if (!recordingScenario) {
      setRecordingCameraState("wide");
      setRecordingLayoutState("docked");
    }
  }, [recordingScenario]);

  useEffect(() => {
    const root = document.documentElement;

    if (!recordingScenario) {
      delete root.dataset.dashboardRecordingActive;
      delete root.dataset.dashboardRecordingCameraState;
      delete root.dataset.dashboardRecordingLayoutState;
      return;
    }

    root.dataset.dashboardRecordingActive = "true";
    root.dataset.dashboardRecordingCameraState = recordingCameraState;
    root.dataset.dashboardRecordingLayoutState = recordingLayoutState;

    return () => {
      delete root.dataset.dashboardRecordingActive;
      delete root.dataset.dashboardRecordingCameraState;
      delete root.dataset.dashboardRecordingLayoutState;
    };
  }, [recordingCameraState, recordingLayoutState, recordingScenario]);

  return (
    <main
      className="dashboard-route-shell"
      data-recording-layout-state={recordingLayoutState}
    >
      <div
        className="dashboard-chat-recording-camera"
        data-camera-state={recordingCameraState}
        data-layout-state={recordingLayoutState}
        data-recording-active={recordingScenario ? "true" : "false"}
      >
        <ClientChatPage
          routeSessionId={routeSessionId}
          recordingScenario={recordingScenario}
          onRecordingCameraStateChange={setRecordingCameraState}
          onRecordingLayoutStateChange={setRecordingLayoutState}
        />
      </div>
      <GlobalKnowledgeUploadWidget />
    </main>
  );
}
