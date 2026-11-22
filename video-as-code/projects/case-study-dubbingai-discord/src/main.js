import { renderScenes } from "./scenes/renderScenes.js";

const app = document.querySelector("#app");

if (!app) {
  throw new Error("App root not found.");
}

renderScenes(app);
