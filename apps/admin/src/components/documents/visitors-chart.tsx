"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@prosfin/ui";
import { ToggleGroup, ToggleGroupItem } from "@prosfin/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@prosfin/ui";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
import { ChartContainer } from "@/components/dashboard/chart-container";

const chartData = [
  { date: "Jun 24", desktop: 120, mobile: 80 },
  { date: "Jun 25", desktop: 150, mobile: 100 },
  { date: "Jun 26", desktop: 180, mobile: 120 },
  { date: "Jun 27", desktop: 200, mobile: 140 },
  { date: "Jun 28", desktop: 190, mobile: 130 },
  { date: "Jun 29", desktop: 220, mobile: 150 },
  { date: "Jun 30", desktop: 240, mobile: 160 },
];

export function VisitorsChart() {
  const [period, setPeriod] = React.useState("7days");

  return (
    <Card>
      <CardHeader className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Total Visitors</CardTitle>
            <CardDescription className="mt-1">
              <span className="hidden md:inline">Total for the last 3 months</span>
              <span className="md:hidden">Last 3 months</span>
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <ToggleGroup
              type="single"
              value={period}
              onValueChange={(value) => value && setPeriod(value)}
              className="hidden md:flex"
            >
              <ToggleGroupItem value="3months">Last 3 months</ToggleGroupItem>
              <ToggleGroupItem value="30days">Last 30 days</ToggleGroupItem>
              <ToggleGroupItem value="7days">Last 7 days</ToggleGroupItem>
            </ToggleGroup>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-40 md:hidden">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">Last 3 months</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="7days">Last 7 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
              <XAxis
                dataKey="date"
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <Area
                type="monotone"
                dataKey="desktop"
                stroke="hsl(var(--primary))"
                fill="url(#fillDesktop)"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="mobile"
                stroke="hsl(var(--primary))"
                fill="url(#fillMobile)"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

