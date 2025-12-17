"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { AdminSectionCard } from "@prosfin/ui";
import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { ChartContainer } from "./chart-container";
import { calculateDelta } from "@/lib/data/dashboard";
import { cn } from "@prosfin/ui";

interface KPICardProps {
  title: string;
  value: number;
  compareValue?: number;
  sparklineData: number[];
  tooltip?: string;
  drillDownPath?: string;
  drillDownParams?: Record<string, string>;
  formatValue?: (value: number) => string;
  className?: string;
}

export function KPICard({
  title,
  value,
  compareValue,
  sparklineData,
  tooltip,
  drillDownPath,
  drillDownParams,
  formatValue = (v) => v.toLocaleString(),
  className,
}: KPICardProps) {
  const router = useRouter();
  
  const delta = compareValue !== undefined ? calculateDelta(value, compareValue) : null;
  
  const handleClick = () => {
    if (drillDownPath) {
      const params = new URLSearchParams(drillDownParams);
      const url = params.toString() ? `${drillDownPath}?${params.toString()}` : drillDownPath;
      router.push(url);
    }
  };

  // Prepare sparkline chart data
  const sparklineChartData = sparklineData.map((v, i) => ({
    value: v,
    index: i,
  }));

  return (
    <AdminSectionCard
      title={title}
      className={cn("cursor-pointer transition-shadow hover:shadow-md", className)}
      onClick={handleClick}
    >
      <div className="space-y-3">
        {/* Main Value */}
        <div className="flex items-baseline justify-between">
          <div className="text-3xl font-bold">{formatValue(value)}</div>
          {tooltip && (
            <div className="group relative">
              <Info className="size-4 text-muted-foreground" />
              <div className="invisible absolute bottom-full right-0 mb-2 w-48 rounded-md border bg-popover p-2 text-xs group-hover:visible z-10">
                {tooltip}
              </div>
            </div>
          )}
        </div>

        {/* Delta */}
        {delta && (
          <div className="flex items-center gap-2">
            {delta.absolute === 0 ? (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Minus className="size-3" />
                <span>No change</span>
              </div>
            ) : (
              <div
                className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  delta.isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {delta.isPositive ? (
                  <TrendingUp className="size-4" />
                ) : (
                  <TrendingDown className="size-4" />
                )}
                <span>
                  {delta.isPositive ? "+" : ""}
                  {delta.absolute}
                </span>
                {delta.percent !== null && (
                  <span className="text-muted-foreground">
                    ({delta.isPositive ? "+" : ""}
                    {delta.percent}%)
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Sparkline */}
        {sparklineData.length > 0 && (
          <div className="h-[60px] w-full">
            <ChartContainer className="min-h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparklineChartData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        )}
      </div>
    </AdminSectionCard>
  );
}

