"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { TimeRangeSwitch, type TimeRange } from "./time-range-switch"

// Mock data for leads trend
const leadsData = [
  { date: "2024-06-01", leads: 12 },
  { date: "2024-06-02", leads: 19 },
  { date: "2024-06-03", leads: 8 },
  { date: "2024-06-04", leads: 15 },
  { date: "2024-06-05", leads: 22 },
  { date: "2024-06-06", leads: 18 },
  { date: "2024-06-07", leads: 25 },
  { date: "2024-06-08", leads: 20 },
  { date: "2024-06-09", leads: 14 },
  { date: "2024-06-10", leads: 17 },
  { date: "2024-06-11", leads: 23 },
  { date: "2024-06-12", leads: 16 },
  { date: "2024-06-13", leads: 21 },
  { date: "2024-06-14", leads: 19 },
  { date: "2024-06-15", leads: 24 },
  { date: "2024-06-16", leads: 18 },
  { date: "2024-06-17", leads: 22 },
  { date: "2024-06-18", leads: 20 },
  { date: "2024-06-19", leads: 16 },
  { date: "2024-06-20", leads: 23 },
  { date: "2024-06-21", leads: 19 },
  { date: "2024-06-22", leads: 25 },
  { date: "2024-06-23", leads: 21 },
  { date: "2024-06-24", leads: 17 },
  { date: "2024-06-25", leads: 20 },
  { date: "2024-06-26", leads: 24 },
  { date: "2024-06-27", leads: 18 },
  { date: "2024-06-28", leads: 22 },
  { date: "2024-06-29", leads: 19 },
  { date: "2024-06-30", leads: 26 },
]

const chartConfig = {
  leads: {
    label: "Leads",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function TrendsWidget() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState<TimeRange>("30d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = leadsData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 30
    if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Leads Trend</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            New leads over time
          </span>
          <span className="@[540px]/card:hidden">Leads over time</span>
        </CardDescription>
        <CardAction>
          <TimeRangeSwitch value={timeRange} onValueChange={setTimeRange} />
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="min-h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillLeads" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-leads)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-leads)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="leads"
              type="natural"
              fill="url(#fillLeads)"
              stroke="var(--color-leads)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
