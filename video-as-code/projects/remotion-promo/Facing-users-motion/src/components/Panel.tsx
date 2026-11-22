import React from "react";
import {tokens} from "../theme/tokens";

export const Panel: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  padding?: number | string;
}> = ({children, style, padding = 28}) => {
  return (
    <div
      style={{
        background: tokens.colors.panel,
        border: `1px solid ${tokens.colors.panelBorder}`,
        borderRadius: tokens.radii.card,
        boxShadow: tokens.shadows.card,
        padding,
        ...style
      }}
    >
      {children}
    </div>
  );
};
