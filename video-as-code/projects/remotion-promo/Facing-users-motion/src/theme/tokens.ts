export const tokens = {
  fps: 30,
  colors: {
    // Light theme (original)
    canvas: "#f5f4ee",
    canvasAlt: "#ebe7e0",
    panel: "#ffffff",
    panelMuted: "#f3f0eb",
    panelBorder: "#d4d0ca",
    text: "#1e293b",
    title: "#111827",
    muted: "#6b7280",
    primary: "#644fb8",
    primaryHover: "#55439f",
    primaryTintBg: "#ece7f8",
    primaryTintBorder: "#d8cff2",
    primaryTintText: "#644fb8",
    bubbleBg: "rgba(100,79,184,0.10)",
    bubbleBorder: "rgba(100,79,184,0.22)",
    bubbleText: "#2f2851",
    successBg: "#dcfce7",
    successBorder: "#bbf7d0",
    successText: "#166434",
    warningBg: "#fef3c7",
    warningBorder: "#fce7c0",
    warningText: "#92400e",
    neutralBg: "#f8fafc",
    neutralBorder: "#e5e7eb",
    neutralText: "#475569",
    badgePrimaryBg: "#eef2ff",
    badgePrimaryBorder: "#c7d2fe",
    badgePrimaryText: "#4f46e5",
    divider: "#e6e1d8",
    shadowTint: "rgba(41,40,48,0.10)",
    // Lucius Brand Colors
    luciusPurple: "#5538C7",
    warmIvory: "#E1DAC0",
    lavenderMist: "#BAB2FF",
    orchidBloom: "#B268D8",
    deepMoss: "#1B4038",
    cobaltPulse: "#504DDC",
    // Vercel/Linear Dark Theme
    dark: {
      bg: "#000000",
      bgElevated: "#0a0a0a",
      bgSecondary: "#111111",
      bgTertiary: "#1a1a1a",
      surface: "rgba(255,255,255,0.03)",
      surfaceHover: "rgba(255,255,255,0.06)",
      surfaceActive: "rgba(255,255,255,0.08)",
      border: "rgba(255,255,255,0.1)",
      borderHover: "rgba(255,255,255,0.15)",
      borderActive: "rgba(255,255,255,0.2)",
      text: "#ffffff",
      textSecondary: "rgba(255,255,255,0.7)",
      textMuted: "rgba(255,255,255,0.5)",
      textDisabled: "rgba(255,255,255,0.3)",
      // Gradient accents
      accentPurple: "#7c3aed",
      accentBlue: "#3b82f6",
      accentCyan: "#06b6d4",
      accentPink: "#ec4899",
      // Glow colors
      glowPurple: "rgba(124,58,237,0.5)",
      glowBlue: "rgba(59,130,246,0.5)",
      glowCyan: "rgba(6,182,212,0.5)"
    }
  },
  fonts: {
    body: "\"Outfit\", \"Inter\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
    mono: "\"JetBrains Mono\", \"SFMono-Regular\", Consolas, monospace",
    sfPro: "-apple-system, BlinkMacSystemFont, \"SF Pro\", \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif",
    recoleta: "\"Playfair Display\", Georgia, \"Times New Roman\", serif",
    inter: "\"Inter\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif"
  },
  radii: {
    chip: 999,
    bubble: 18,
    card: 18,
    corner: 8
  },
  shadows: {
    card: "0 4px 8px -1px rgba(0,0,0,0.10), 0 1px 2px -2px rgba(0,0,0,0.10)",
    float: "0 10px 24px rgba(100,79,184,0.08)"
  },
  spacing: {
    pageX: 96,
    pageY: 84
  }
} as const;
