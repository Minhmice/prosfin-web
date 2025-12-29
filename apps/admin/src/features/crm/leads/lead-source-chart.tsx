/**
 * Lead Source Chart Component
 * Stacked area chart for lead sources trend
 */

"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, Legend, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { useLeadSourceChart } from "./use-lead-source-chart"
import { Skeleton } from "@/components/ui/skeleton"

const chartConfig: ChartConfig = {
  website: {
    label: "Website",
    color: "var(--chart-1)",
  },
  referral: {
    label: "Referral",
    color: "var(--chart-2)",
  },
  social: {
    label: "Social",
    color: "var(--chart-3)",
  },
  other: {
    label: "Other",
    color: "var(--chart-4)",
  },
  facebook: {
    label: "Facebook",
    color: "var(--chart-1)",
  },
  tiktok: {
    label: "TikTok",
    color: "var(--chart-2)",
  },
  linkedin: {
    label: "LinkedIn",
    color: "var(--chart-3)",
  },
  twitter: {
    label: "Twitter",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

interface LeadSourceChartProps {
  range: "7d" | "30d"
}

export function LeadSourceChart({ range }: LeadSourceChartProps) {
  const { data, isLoading, error } = useLeadSourceChart(range)

  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />
  }

  if (error || !data || !data.points || data.points.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground">
        No data available
      </div>
    )
  }

  // Format data for Recharts
  const chartData = data.points.map((point) => ({
    date: new Date(point.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    web: typeof point.web === "number" ? point.web : 0,
    referral: typeof point.referral === "number" ? point.referral : 0,
    event: typeof point.event === "number" ? point.event : 0,
    other: typeof point.other === "number" ? point.other : 0,
  }))

  // Get top sources (limit to 4, group rest as "Other")
  const sources = React.useMemo(() => {
    if (!data?.points || data.points.length === 0) return []
    
    // Calculate total for each source across all points
    const totals: Record<string, number> = {}
    data.points.forEach((point) => {
      Object.keys(point).forEach((key) => {
        if (key !== "date" && typeof point[key as keyof typeof point] === "number") {
          totals[key] = (totals[key] || 0) + (point[key as keyof typeof point] as number)
        }
      })
    })

    // Sort sources by total and get top 4
    const sorted = Object.entries(totals)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4)
      .map(([key]) => key)

    return sorted
  }, [data])

  // Format data with top sources + Other
  const formattedChartData = React.useMemo(() => {
    if (!data?.points) return []
    
    return data.points.map((point) => {
      const result: Record<string, string | number> = {
        date: new Date(point.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      }
      
      let otherTotal = 0
      Object.keys(point).forEach((key) => {
        if (key !== "date") {
          const value = point[key as keyof typeof point]
          if (typeof value === "number") {
            if (sources.includes(key)) {
              result[key] = value
            } else {
              otherTotal += value
            }
          }
        }
      })
      
      if (otherTotal > 0) {
        result.other = otherTotal
      }
      
      return result
    })
  }, [data, sources])

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <AreaChart data={formattedChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip 
          content={<ChartTooltipContent 
            indicator="line"
            labelFormatter={(value) => `Date: ${value}`}
          />} 
        />
        <Legend 
          wrapperStyle={{ paddingTop: "20px" }}
          iconType="square"
        />
        {sources.map((source) => {
          const sourceLabel = String(chartConfig[source as keyof typeof chartConfig]?.label ?? source)
          return (
            <Area
              key={source}
              type="monotone"
              dataKey={source}
              stackId="1"
              stroke={`var(--color-${source})`}
              fill={`var(--color-${source})`}
              fillOpacity={0.6}
              name={sourceLabel}
            />
          )
        })}
        {formattedChartData.some((d) => typeof d.other === "number" && d.other > 0) && (
          <Area
            type="monotone"
            dataKey="other"
            stackId="1"
            stroke="var(--color-other)"
            fill="var(--color-other)"
            fillOpacity={0.6}
            name="Other"
          />
        )}
      </AreaChart>
    </ChartContainer>
  )
}

