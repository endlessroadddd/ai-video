import { motion, AnimatePresence } from "framer-motion";
import { type CSSProperties } from "react";

interface CursorProps {
  x: number;
  y: number;
  isVisible: boolean;
  isClicked: boolean;
  delay?: number;
}

export default function Cursor({ x, y, isVisible, isClicked, delay = 0 }: Readonly<CursorProps>) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="interactive-cursor"
          initial={{ opacity: 0, scale: 1.5, x: x - 100, y: y + 100 }}
          animate={{
            opacity: 1,
            scale: isClicked ? 0.8 : 1,
            x: x,
            y: y,
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 150,
            delay: delay,
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999,
            pointerEvents: "none",
            width: "32px",
            height: "32px",
          } as CSSProperties}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))",
            }}
          >
            <path
              d="M1 1L12.5 31L16.5 18.5L29 14.5L1 1Z"
              fill="white"
              stroke="black"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {isClicked && (
              <motion.circle
                cx="4"
                cy="4"
                r="10"
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.4 }}
                fill="rgba(255, 255, 255, 0.5)"
              />
            )}
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
