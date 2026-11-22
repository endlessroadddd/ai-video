import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/material-library.css";
import { ShowcaseApp } from "./showcase-app";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Showcase root not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <ShowcaseApp />
  </StrictMode>,
);
