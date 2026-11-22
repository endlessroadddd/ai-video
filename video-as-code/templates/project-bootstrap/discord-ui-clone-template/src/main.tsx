import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Scenario } from "./Scenario";
import { UserScenario } from "./UserScenario";
import "./app.css";

const path = window.location.pathname;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {path === "/scenario" ? <Scenario /> : path === "/user-scenario" ? <UserScenario /> : <App />}
  </React.StrictMode>,
);
