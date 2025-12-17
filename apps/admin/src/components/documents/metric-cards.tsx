"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@prosfin/ui";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@prosfin/ui";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "up" | "down";
  description: string;
  subtitle: string;
}

function MetricCard({
  title,
  value,
  change,
  changeType,
  description,
  subtitle,
}: MetricCardProps) {
  return (
    <Card className="bg-gradient-to-t shadow-xs">
      <CardHeader className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6">
        <div className="text-muted-foreground text-sm">{title}</div>
        <div className="flex items-start justify-between">
          <div className="text-2xl font-semibold tabular-nums md:text-3xl">
            {value}
          </div>
          <div className="flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium">
            {changeType === "up" ? (
              <TrendingUp className="size-3" />
            ) : (
              <TrendingDown className="size-3" />
            )}
            <span
              className={cn(
                changeType === "up" ? "text-green-600" : "text-red-600"
              )}
            >
              {change}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-1.5 px-6 text-sm">
        <div className="flex items-center gap-2 font-medium">
          {description}
          {changeType === "up" ? (
            <TrendingUp className="size-4" />
          ) : (
            <TrendingDown className="size-4" />
          )}
        </div>
        <div className="text-muted-foreground">{subtitle}</div>
      </CardContent>
    </Card>
  );
}

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Revenue"
        value="$1,250.00"
        change="+12.5%"
        changeType="up"
        description="Trending up this month"
        subtitle="Visitors for the last 6 months"
      />
      <MetricCard
        title="New Customers"
        value="1,234"
        change="-20%"
        changeType="down"
        description="Down 20% this period"
        subtitle="Acquisition needs attention"
      />
      <MetricCard
        title="Active Accounts"
        value="45,678"
        change="+12.5%"
        changeType="up"
        description="Strong user retention"
        subtitle="Engagement exceed targets"
      />
      <MetricCard
        title="Growth Rate"
        value="4.5%"
        change="+4.5%"
        changeType="up"
        description="Steady performance increase"
        subtitle="Meets growth projections"
      />
    </div>
  );
}

