import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./app.css";
import "./styles/knowledge-desk.css";
import "./styles/chat-shell.css";
import "./styles/motion.css";
import "./styles/segment01-doc-miss.css";
import "./styles/segment02-team-revise.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
