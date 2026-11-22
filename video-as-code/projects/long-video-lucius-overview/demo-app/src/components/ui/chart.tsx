"use client"

import * as React from "react"
import { ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"

import { cn } from "@/lib/utils"

// ---- Chart Config ----

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode
    color?: string
  }
>

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }
  return context
}

// ---- ChartStyle ----

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorConfig = Object.entries(config).filter(([, cfg]) => cfg.color)

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `[data-chart="${id}"] {\n${colorConfig
          .map(([key, cfg]) => `  --color-${key}: ${cfg.color};`)
          .join("\n")}\n}`,
      }}
    />
  )
}

// ---- ChartContainer ----

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ReactElement
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ResponsiveContainer>
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

// ---- ChartTooltip ----

const ChartTooltip = RechartsTooltip

type ChartTooltipContentProps = {
  active?: boolean
  payload?: Array<Record<string, unknown>>
  label?: string
  className?: string
  hideLabel?: boolean
  hideIndicator?: boolean
  indicator?: "dot" | "line" | "dashed"
  nameKey?: string
  labelFormatter?: (value: string, payload: Record<string, unknown>[]) => React.ReactNode
  formatter?: (
    value: unknown,
    name: string,
    item: Record<string, unknown>,
    index: number,
    payload: Array<Record<string, unknown>>,
  ) => React.ReactNode
}

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  nameKey,
}: ChartTooltipContentProps) {
  const { config } = useChart()

  if (!active || !payload?.length) {
    return null
  }

  const tooltipLabel = hideLabel
    ? null
    : labelFormatter
      ? labelFormatter(String(label), payload)
      : label

  return (
    <div
      className={cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className,
      )}
    >
      {tooltipLabel && <div className="font-medium">{tooltipLabel}</div>}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = String(nameKey ? item[nameKey] : item.dataKey || item.name || "value")
          const itemConfig = config[key] || {}
          const indicatorColor = (item.color as string) || itemConfig.color || "#6466F1"

          return (
            <div key={`${key}-${index}`} className="flex w-full items-center gap-2">
              {!hideIndicator && (
                <div
                  className={cn(
                    "shrink-0 rounded-[2px]",
                    indicator === "dot" && "h-2.5 w-2.5",
                    indicator === "line" && "h-2.5 w-1",
                  )}
                  style={{ backgroundColor: indicatorColor }}
                />
              )}
              <div className="flex flex-1 justify-between gap-2 leading-none">
                <span className="text-muted-foreground">{itemConfig.label || key}</span>
                <span className="font-mono font-medium tabular-nums text-foreground">
                  {typeof item.value === "number" ? item.value.toLocaleString() : String(item.value)}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ---- ChartLegendContent ----

function ChartLegendContent({
  className,
  payload,
  nameKey,
}: React.ComponentProps<"div"> & {
  payload?: Array<{ value: string; color?: string; dataKey?: string }>
  nameKey?: string
}) {
  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      {payload.map((item) => {
        const key = nameKey ? String(item[nameKey as keyof typeof item]) : item.dataKey || item.value
        const itemConfig = config[key] || {}

        return (
          <div key={key} className="flex items-center gap-1.5">
            <div
              className="h-2 w-2 shrink-0 rounded-[2px]"
              style={{ backgroundColor: item.color || itemConfig.color }}
            />
            <span className="text-xs text-muted-foreground">{itemConfig.label || key}</span>
          </div>
        )
      })}
    </div>
  )
}

export {
  ChartContainer,
  ChartContext,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  useChart,
}
