type ModeTabsProps = {
  mode: "dm" | "community";
  onChange: (mode: "dm" | "community") => void;
};

export function ModeTabs({ mode, onChange }: ModeTabsProps) {
  return (
    <div className="mode-tabs" role="tablist" aria-label="Playground modes">
      <button
        className={mode === "dm" ? "mode-tab mode-tab--active" : "mode-tab"}
        onClick={() => onChange("dm")}
        role="tab"
        aria-selected={mode === "dm"}
        type="button"
      >
        {"DM \u6a21\u5f0f"}
      </button>
      <button
        className={mode === "community" ? "mode-tab mode-tab--active" : "mode-tab"}
        onClick={() => onChange("community")}
        role="tab"
        aria-selected={mode === "community"}
        type="button"
      >
        {"\u793e\u533a\u6a21\u5f0f"}
      </button>
    </div>
  );
}
