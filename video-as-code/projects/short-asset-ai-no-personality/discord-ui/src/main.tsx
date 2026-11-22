import React from "react";
import ReactDOM from "react-dom/client";
import { CommunityScene } from "./CommunityScene";
import { LossChartScene } from "./LossChartScene";
import "./app.css";

const path = window.location.pathname;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {path === "/loss-chart" ? <LossChartScene /> : <CommunityScene />}
  </React.StrictMode>,
);
