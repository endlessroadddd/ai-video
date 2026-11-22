import {registerRoot} from "remotion";
import {loadFont as loadOutfit} from "@remotion/google-fonts/Outfit";
import {loadFont as loadJetBrainsMono} from "@remotion/google-fonts/JetBrainsMono";
import {loadFont as loadPlayfairDisplay} from "@remotion/google-fonts/PlayfairDisplay";
import {loadFont as loadInter} from "@remotion/google-fonts/Inter";
import {RemotionRoot} from "./Root";

loadOutfit();
loadJetBrainsMono();
loadPlayfairDisplay();
loadInter();

registerRoot(RemotionRoot);
