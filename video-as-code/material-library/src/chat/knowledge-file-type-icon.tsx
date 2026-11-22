import type { CSSProperties } from "react";

type KnowledgeFileTypeIconProps = {
  className?: string;
  fileName: string;
  style?: CSSProperties;
};

type FileTypeVisualConfig = {
  color: string;
  label: string;
};

const DEFAULT_FILE_TYPE_CONFIG: FileTypeVisualConfig = {
  color: "#64748B",
  label: "FILE",
};

const FILE_TYPE_CONFIG_MAP: Record<string, FileTypeVisualConfig> = {
  doc: { color: "#6366F1", label: "DOC" },
  docx: { color: "#6366F1", label: "DOC" },
  markdown: { color: "#0EA5E9", label: "MD" },
  md: { color: "#0EA5E9", label: "MD" },
  pdf: { color: "#EF4444", label: "PDF" },
  txt: { color: "#1F2937", label: "TXT" },
};

function getFileExtension(fileName: string): string {
  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex < 0 || lastDotIndex === fileName.length - 1) {
    return "";
  }

  return fileName.slice(lastDotIndex + 1).trim().toLowerCase();
}

export function KnowledgeFileTypeIcon(props: KnowledgeFileTypeIconProps) {
  const { className, fileName, style } = props;
  const extension = getFileExtension(fileName);
  const visualConfig =
    FILE_TYPE_CONFIG_MAP[extension] ?? DEFAULT_FILE_TYPE_CONFIG;

  return (
    <span
      className={className}
      aria-hidden="true"
      style={{
        position: "relative",
        display: "inline-flex",
        width: "28px",
        height: "32px",
        flexShrink: 0,
        overflow: "hidden",
        borderRadius: "6px",
        border: "1px solid #E2E8F0",
        background: "#FFFFFF",
        ...style,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 0,
          height: 0,
          borderBottom: "9px solid #F8FAFC",
          borderLeft: "9px solid transparent",
        }}
      />
      <span
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          left: 0,
          display: "inline-flex",
          height: "16px",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: visualConfig.color,
          color: "#FFFFFF",
          fontSize: "8px",
          fontWeight: 700,
          letterSpacing: "0.04em",
          lineHeight: 1,
        }}
      >
        {visualConfig.label}
      </span>
    </span>
  );
}
