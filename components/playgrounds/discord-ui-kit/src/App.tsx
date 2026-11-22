import { useState } from "react";
import { ModeTabs } from "./components/ModeTabs";
import { communityDemoProps, dmDemoProps } from "./data/demo-props";
import { CommunityScreen } from "./screens/CommunityScreen";
import { DmScreen } from "./screens/DmScreen";
import "./kit.css";
import "./playground.css";

type PlaygroundMode = "dm" | "community";

export default function App() {
  const [mode, setMode] = useState<PlaygroundMode>("dm");
  const controls = <ModeTabs mode={mode} onChange={setMode} />;

  return mode === "dm" ? (
    <DmScreen {...dmDemoProps} topControls={controls} />
  ) : (
    <CommunityScreen {...communityDemoProps} topControls={controls} />
  );
}
