import { useLayoutEffect, useRef, useState, useMemo } from "react";
import ChannelMessage from "../components/ChannelMessage";
import ConfirmDialog from "../components/ConfirmDialog";
import ContextMenu from "../components/ContextMenu";
import DiscordShell from "../components/DiscordShell";
import MemberList from "../components/MemberList";
import ModerationPanel from "../components/ModerationPanel";
import OpeningCard from "../components/OpeningCard";
import OutroSplit from "../components/OutroSplit";
import PipChart from "../components/PipChart";
import Toast from "../components/Toast";
import Cursor from "../components/Cursor";
import { motion, AnimatePresence } from "framer-motion";
import { CHAT_MESSAGES } from "../data/messages";
import {
  MEMBER_MENU_ANCHOR,
  MEMBER_MENU_ITEMS,
  MESSAGE_MENU_ANCHOR,
  MESSAGE_MENU_ITEMS,
  DEFAULT_STAGE_RECT,
  type StageRect,
} from "../data/scene";
import { TOTAL_DURATION_MS } from "../data/shots";
import { fadeWindow } from "../lib/easing";

interface AdSpamPainSceneProps {
  currentMs: number;
}

const EMOJI_ANGRY = "https://fonts.gstatic.com/s/e/notoemoji/latest/1f621/512.webp";
const EMOJI_WEARY = "https://fonts.gstatic.com/s/e/notoemoji/latest/1f629/512.webp";
const EMOJI_PENSIVE = "https://fonts.gstatic.com/s/e/notoemoji/latest/1f614/512.webp";

export default function AdSpamPainScene({ currentMs }: Readonly<AdSpamPainSceneProps>) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [stageRect, setStageRect] = useState<StageRect>(DEFAULT_STAGE_RECT);

  useLayoutEffect(() => {
    const node = stageRef.current;
    if (!node) {
      return;
    }

    const updateStageRect = () => {
      const rect = node.getBoundingClientRect();
      setStageRect({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      });
    };

    updateStageRect();
    window.addEventListener("resize", updateStageRect);

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updateStageRect);
      resizeObserver.observe(node);
    }

    return () => {
      window.removeEventListener("resize", updateStageRect);
      resizeObserver?.disconnect();
    };
  }, []);

  const discordOpacity = fadeWindow(currentMs, 3_780, 420, TOTAL_DURATION_MS, 0);

  const chartAVisible = currentMs >= 10_420 && currentMs < 18_580;
  const chartBVisible = currentMs >= 25_920 && currentMs < 30_620;

  const messageMenuVisible = currentMs >= 7_680 && currentMs < 8_660;
  const moderationPanelVisible = currentMs >= 8_920 && currentMs < 13_980;
  const memberMenuVisible = currentMs >= 20_460 && currentMs < 22_280;
  const confirmDialogVisible = currentMs >= 22_540 && currentMs < 24_960;
  const toastVisible = currentMs >= 25_160 && currentMs < 26_460;

  // Comprehensive Cursor Narrative Logic
  const cursorState = useMemo(() => {
    // 1. Discovery: Right-click the spam message (Balanced on message body)
    if (currentMs >= 6_800 && currentMs < 8_400) {
      return {
        visible: true,
        clicked: currentMs >= 7_600,
        x: stageRect.left + stageRect.width * 0.38,
        y: stageRect.top + stageRect.height * 0.45,
      };
    }
    // 2. Control: Interaction with Input in Moderation Panel
    if (currentMs >= 9_400 && currentMs < 10_800) {
      return {
        visible: true,
        clicked: currentMs >= 10_200,
        x: stageRect.left + stageRect.width * 0.58, // Centered on keyword input area
        y: stageRect.top + stageRect.height * 0.82,
      };
    }
    // 3. Identification: Right-click culprit in member list
    if (currentMs >= 19_600 && currentMs < 21_000) {
      return {
        visible: true,
        clicked: currentMs >= 20_400,
        x: stageRect.left + stageRect.width * MEMBER_MENU_ANCHOR.x,
        y: stageRect.top + stageRect.height * MEMBER_MENU_ANCHOR.y,
      };
    }
    // 4. Action: Select "Kick member" from context menu
    if (currentMs >= 21_200 && currentMs < 22_400) {
      return {
        visible: true,
        clicked: currentMs >= 21_900,
        x: stageRect.left + stageRect.width * 0.842, 
        y: stageRect.top + stageRect.height * 0.45,  // Precisely lowered to hit 'Kick'
      };
    }
    // 5. Finality: Click "Kick" in confirmation dialog
    if (currentMs >= 22_850 && currentMs < 25_000) {
      return {
        visible: true,
        clicked: currentMs >= 23_700,
        x: stageRect.left + stageRect.width * 0.565,
        y: stageRect.top + stageRect.height * 0.60,
      };
    }

    return { visible: false, clicked: false, x: 0, y: 0 };
  }, [currentMs, stageRect]);

  const floatingEmojis = useMemo(() => {
    const emojis = [];
    // Angry face when spam starts
    if (currentMs >= 5_500 && currentMs < 7_900) {
      emojis.push({ id: "angry-1", src: EMOJI_ANGRY, x: "75%", y: "20%", size: 120 });
    }
    // Weary face during manual update struggle
    if (currentMs >= 11_600 && currentMs < 14_800) {
      emojis.push({ id: "weary-1", src: EMOJI_WEARY, x: "30%", y: "15%", size: 140 });
    }
    // High pressure during bot wave
    if (currentMs >= 27_400 && currentMs < 30_400) {
      emojis.push({ id: "angry-2", src: EMOJI_ANGRY, x: "82%", y: "45%", size: 160 });
      emojis.push({ id: "pensive-1", src: EMOJI_PENSIVE, x: "15%", y: "65%", size: 110 });
    }
    return emojis;
  }, [currentMs]);

  return (
    <div className="scene-root">
      <div className="scene-backdrop" aria-hidden="true" />

      <OpeningCard currentMs={currentMs} />

      <DiscordShell
        composerPlaceholder="Message #general"
        members={<MemberList currentMs={currentMs} />}
        messages={
          <div className="messages-flow">
            {CHAT_MESSAGES.filter((message) => currentMs >= message.enterMs).map((message) => {
              const variant =
                message.id === "spam-original" && currentMs >= 7_460 && currentMs < 13_900
                  ? "highlighted"
                  : message.tone === "bypass"
                    ? "bypass"
                    : message.tone === "spam"
                      ? "spam"
                      : "normal";

              return (
                <ChannelMessage
                  key={message.id}
                  author={message.author}
                  badge={message.badge}
                  body={message.body}
                  currentMs={currentMs}
                  enterMs={message.enterMs}
                  meta={message.meta}
                  variant={variant}
                />
              );
            })}
          </div>
        }
        opacity={discordOpacity}
        stageRef={stageRef}
      />

      <ContextMenu
        anchor={MESSAGE_MENU_ANCHOR}
        items={MESSAGE_MENU_ITEMS}
        stageRect={stageRect}
        visible={messageMenuVisible}
      />
      <ModerationPanel currentMs={currentMs} visible={moderationPanelVisible} />
      <ContextMenu
        anchor={MEMBER_MENU_ANCHOR}
        items={MEMBER_MENU_ITEMS}
        stageRect={stageRect}
        visible={memberMenuVisible}
      />
      <ConfirmDialog userName="airdrop_king" visible={confirmDialogVisible} />
      <Toast message="User kicked from server." visible={toastVisible} />
      <PipChart currentMs={currentMs} variant="A" visible={chartAVisible} />
      <PipChart currentMs={currentMs} variant="B" visible={chartBVisible} />
      
      <Cursor 
        x={cursorState.x} 
        y={cursorState.y} 
        isVisible={cursorState.visible} 
        isClicked={cursorState.clicked} 
      />

      <AnimatePresence>
        {floatingEmojis.map((emoji) => (
          <motion.div
            key={emoji.id}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.5 }}
            style={{
              position: "absolute",
              left: emoji.x,
              top: emoji.y,
              zIndex: 100,
              pointerEvents: "none",
            }}
          >
            <img 
              src={emoji.src} 
              alt="Admin emotion" 
              style={{ width: emoji.size, height: emoji.size }} 
            />
          </motion.div>
        ))}
      </AnimatePresence>

      <OutroSplit currentMs={currentMs} />
    </div>
  );
}
