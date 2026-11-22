import type { CSSProperties, ReactNode } from "react";

type SettingsSectionShellProps = {
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  title: string;
};

type SettingsCommunityListSkeletonProps = {
  className?: string;
  rowCount?: number;
  style?: CSSProperties;
};

type SettingsWorkgroupCardSkeletonListProps = {
  cardCount?: number;
  className?: string;
  style?: CSSProperties;
};

const SETTINGS_COMMUNITY_ROW_SKELETON_CONFIGS = [
  {
    primaryMetaWidth: "72px",
    secondaryMetaWidth: "112px",
    titleWidth: "38%",
  },
  { primaryMetaWidth: "86px", secondaryMetaWidth: "96px", titleWidth: "44%" },
  {
    primaryMetaWidth: "64px",
    secondaryMetaWidth: "124px",
    titleWidth: "32%",
  },
] as const;

const SETTINGS_WORKGROUP_CARD_SKELETON_CONFIGS = [
  { helperWidth: "300px", summaryWidth: "220px", titleWidth: "76px" },
  { helperWidth: "280px", summaryWidth: "250px", titleWidth: "88px" },
  { helperWidth: "260px", summaryWidth: "210px", titleWidth: "70px" },
  { helperWidth: "294px", summaryWidth: "236px", titleWidth: "82px" },
] as const;

export const SETTINGS_SECTION_SURFACE_STYLE: CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #E5E7EB",
  borderRadius: "16px",
  boxShadow: "none",
};

function SkeletonBlock(props: {
  className?: string;
  height: string;
  style?: CSSProperties;
  width?: string;
}) {
  return (
    <span
      className={props.className}
      style={{
        display: "block",
        width: props.width ?? "100%",
        height: props.height,
        borderRadius: "10px",
        background:
          "linear-gradient(90deg, rgba(226,232,240,0.72) 0%, rgba(241,245,249,0.98) 50%, rgba(226,232,240,0.72) 100%)",
        ...props.style,
      }}
    />
  );
}

export function SettingsSectionShell(props: SettingsSectionShellProps) {
  const { actions, children, className, style, title } = props;

  return (
    <section
      className={className}
      style={{
        width: "100%",
        maxWidth: "940px",
        margin: "0 auto",
        ...style,
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          marginBottom: "14px",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#1E293B",
            fontSize: "24px",
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h2>
        {actions ? <div style={{ flexShrink: 0 }}>{actions}</div> : null}
      </header>

      {children}
    </section>
  );
}

export function SettingsCommunityListSkeleton(
  props?: SettingsCommunityListSkeletonProps,
) {
  const { className, rowCount = 3, style } = props ?? {};

  return (
    <div
      className={className}
      style={{
        display: "grid",
        gap: "11px",
        ...style,
      }}
    >
      {Array.from({ length: rowCount }).map((_, index) => {
        const config =
          SETTINGS_COMMUNITY_ROW_SKELETON_CONFIGS[
            index % SETTINGS_COMMUNITY_ROW_SKELETON_CONFIGS.length
          ];

        return (
          <article
            key={`community-skeleton-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              height: "82px",
              padding: "0 24px",
              borderRadius: "14px",
              border: "1px solid rgba(226, 232, 240, 0.9)",
              background: "#FFFFFF",
            }}
          >
            <SkeletonBlock
              height="48px"
              style={{ borderRadius: "999px", flexShrink: 0 }}
              width="48px"
            />

            <div style={{ minWidth: 0, flex: "1 1 auto", marginLeft: "24px" }}>
              <SkeletonBlock height="16px" width={config.titleWidth} />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginTop: "10px",
                }}
              >
                <SkeletonBlock height="12px" width={config.primaryMetaWidth} />
                <span
                  style={{
                    width: "1px",
                    height: "12px",
                    background: "#E2E8F0",
                  }}
                />
                <SkeletonBlock
                  height="12px"
                  width={config.secondaryMetaWidth}
                />
              </div>
            </div>

            <SkeletonBlock
              height="20px"
              style={{ borderRadius: "6px", marginLeft: "16px", flexShrink: 0 }}
              width="20px"
            />
          </article>
        );
      })}
    </div>
  );
}

export function SettingsWorkgroupCardSkeletonList(
  props?: SettingsWorkgroupCardSkeletonListProps,
) {
  const { cardCount = 4, className, style } = props ?? {};

  return (
    <div
      className={className}
      style={{
        display: "grid",
        gap: "12px",
        ...style,
      }}
    >
      {Array.from({ length: cardCount }).map((_, index) => {
        const config =
          SETTINGS_WORKGROUP_CARD_SKELETON_CONFIGS[
            index % SETTINGS_WORKGROUP_CARD_SKELETON_CONFIGS.length
          ];

        return (
          <article
            key={`workgroup-skeleton-${index}`}
            style={{
              ...SETTINGS_SECTION_SURFACE_STYLE,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gap: "16px",
                padding: "20px",
              }}
            >
              <header
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    minWidth: 0,
                    flex: "1 1 420px",
                  }}
                >
                  <SkeletonBlock
                    height="44px"
                    style={{ borderRadius: "18px", flexShrink: 0 }}
                    width="44px"
                  />

                  <div style={{ minWidth: 0, flex: "1 1 auto" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      <SkeletonBlock height="18px" width={config.titleWidth} />
                      <SkeletonBlock
                        height="20px"
                        style={{ borderRadius: "999px" }}
                        width="72px"
                      />
                      <SkeletonBlock
                        height="20px"
                        style={{ borderRadius: "999px" }}
                        width="88px"
                      />
                    </div>
                    <SkeletonBlock
                      height="16px"
                      style={{ marginTop: "10px" }}
                      width={config.summaryWidth}
                    />
                    <SkeletonBlock
                      height="12px"
                      style={{ marginTop: "8px" }}
                      width={config.helperWidth}
                    />
                  </div>
                </div>

                <SkeletonBlock
                  height="36px"
                  style={{ borderRadius: "12px", flexShrink: 0 }}
                  width="116px"
                />
              </header>

              <div style={{ display: "grid", gap: "8px" }}>
                {Array.from({ length: 2 }).map((__, channelIndex) => (
                  <div
                    key={`workgroup-channel-${index}-${channelIndex}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "16px",
                      padding: "14px 16px",
                      borderRadius: "16px",
                      border: "1px solid rgba(226, 232, 240, 0.9)",
                      background: "#FFFFFF",
                    }}
                  >
                    <div style={{ minWidth: 0, flex: "1 1 auto" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          flexWrap: "wrap",
                        }}
                      >
                        <SkeletonBlock
                          height="14px"
                          width={channelIndex === 0 ? "148px" : "124px"}
                        />
                        <SkeletonBlock
                          height="20px"
                          style={{ borderRadius: "999px" }}
                          width="58px"
                        />
                      </div>
                      <SkeletonBlock
                        height="12px"
                        style={{ marginTop: "10px" }}
                        width={channelIndex === 0 ? "196px" : "224px"}
                      />
                    </div>

                    <SkeletonBlock
                      height="36px"
                      style={{ borderRadius: "12px", flexShrink: 0 }}
                      width="96px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
