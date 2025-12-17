"use client";

import * as React from "react";
import { format, parseISO } from "date-fns";
import { AdminSectionCard } from "@prosfin/ui";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartContainer } from "./chart-container";
import type { DailySeriesPoint } from "@/lib/data/dashboard";

interface TrendChartProps {
  title: string;
  data: DailySeriesPoint[];
  compareData?: DailySeriesPoint[];
  metric: "sessions" | "leads" | "qualified" | "meetings" | "won";
  onBarClick?: (date: string) => void;
}

const metricLabels: Record<TrendChartProps["metric"], string> = {
  sessions: "Sessions",
  leads: "Leads",
  qualified: "Qualified",
  meetings: "Meetings",
  won: "Won",
};

export function TrendChart({ title, data, compareData, metric, onBarClick }: TrendChartProps) {
  // Combine data for chart
  const chartData = React.useMemo(() => {
    return data.map((point) => {
      const comparePoint = compareData?.find((p) => p.date === point.date);
      return {
        date: format(parseISO(point.date), "MMM dd"),
        current: point[metric],
        previous: comparePoint?.[metric] ?? null,
      };
    });
  }, [data, compareData, metric]);

  return (
    <AdminSectionCard title={title}>
      <ChartContainer className="min-h-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
              {compareData && (
                <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                </linearGradient>
              )}
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            {compareData && (
              <Legend
                formatter={(value) => (value === "current" ? "Current Period" : "Previous Period")}
              />
            )}
            <Area
              type="monotone"
              dataKey="current"
              stroke="hsl(var(--chart-1))"
              fill="url(#colorCurrent)"
              name="current"
            />
            {compareData && (
              <Area
                type="monotone"
                dataKey="previous"
                stroke="hsl(var(--chart-2))"
                fill="url(#colorPrevious)"
                strokeDasharray="5 5"
                name="previous"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </AdminSectionCard>
  );
}

