"use client";

import * as React from "react";
import { format, startOfDay, subDays, startOfWeek, startOfMonth, parseISO } from "date-fns";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Label,
} from "@prosfin/ui";
import { Switch } from "@/components/shared/switch";
import { Calendar, ChevronDown, Clock } from "lucide-react";
import { useUrlState } from "@/hooks/use-url-state";
import type { DateRange } from "@/lib/data/dashboard";

function LastUpdatedTime() {
  const [time, setTime] = React.useState<string>("--:--");
  
  React.useEffect(() => {
    // Only set time after mount to avoid hydration mismatch
    setTime(format(new Date(), "HH:mm"));
    
    // Update every minute
    const interval = setInterval(() => {
      setTime(format(new Date(), "HH:mm"));
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground" suppressHydrationWarning>
      <Clock className="size-3" />
      Last updated: {time}
    </div>
  );
}

interface DashboardControlBarProps {
  onDateRangeChange?: (range: DateRange) => void;
  onCompareChange?: (enabled: boolean) => void;
}

type DatePreset = "today" | "last7" | "last14" | "last30" | "thisWeek" | "thisMonth" | "custom";

export function DashboardControlBar({
  onDateRangeChange,
  onCompareChange,
}: DashboardControlBarProps) {
  const [fromStr, setFromStr] = useUrlState<string>("from", "");
  const [toStr, setToStr] = useUrlState<string>("to", "");
  const [compareEnabled, setCompareEnabled] = useUrlState<boolean>("compare", false, { replace: true });
  const [compareMode, setCompareMode] = useUrlState<string>("compare_mode", "prev", { replace: true });

  // Initialize with default range (last 30 days) - only once on mount
  const hasInitialized = React.useRef(false);
  React.useEffect(() => {
    // Only initialize if both are empty and we haven't initialized yet
    if (!hasInitialized.current && !fromStr && !toStr) {
      hasInitialized.current = true;
      const to = startOfDay(new Date());
      const from = startOfDay(subDays(to, 30));
      const fromFormatted = format(from, "yyyy-MM-dd");
      const toFormatted = format(to, "yyyy-MM-dd");
      
      // Only set if different from current values to avoid infinite loop
      if (fromStr !== fromFormatted) {
        setFromStr(fromFormatted);
      }
      if (toStr !== toFormatted) {
        setToStr(toFormatted);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const currentRange: DateRange | null = React.useMemo(() => {
    if (!fromStr || !toStr) return null;
    try {
      return {
        from: startOfDay(parseISO(fromStr)),
        to: startOfDay(parseISO(toStr)),
      };
    } catch {
      return null;
    }
  }, [fromStr, toStr]);

  const handlePreset = (preset: DatePreset) => {
    const today = startOfDay(new Date());
    let from: Date;
    let to: Date = today;

    switch (preset) {
      case "today":
        from = today;
        to = today;
        break;
      case "last7":
        from = startOfDay(subDays(today, 6));
        break;
      case "last14":
        from = startOfDay(subDays(today, 13));
        break;
      case "last30":
        from = startOfDay(subDays(today, 29));
        break;
      case "thisWeek":
        from = startOfWeek(today, { weekStartsOn: 1 });
        break;
      case "thisMonth":
        from = startOfMonth(today);
        break;
      default:
        return;
    }

    setFromStr(format(from, "yyyy-MM-dd"));
    setToStr(format(to, "yyyy-MM-dd"));
  };

  React.useEffect(() => {
    if (currentRange) {
      onDateRangeChange?.(currentRange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRange]);

  React.useEffect(() => {
    onCompareChange?.(compareEnabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compareEnabled]);

  const rangeLabel = React.useMemo(() => {
    if (!currentRange) return "Select range";
    if (format(currentRange.from, "yyyy-MM-dd") === format(currentRange.to, "yyyy-MM-dd")) {
      return format(currentRange.from, "MMM dd, yyyy");
    }
    return `${format(currentRange.from, "MMM dd")} - ${format(currentRange.to, "MMM dd, yyyy")}`;
  }, [currentRange]);

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b bg-background px-4 py-3">
      <div className="flex items-center gap-4">
        {/* Date Range Picker */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8" suppressHydrationWarning>
              <Calendar className="mr-2 size-4" />
              {rangeLabel}
              <ChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem onClick={() => handlePreset("today")}>Today</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handlePreset("last7")}>Last 7 days</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handlePreset("last14")}>Last 14 days</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handlePreset("last30")}>Last 30 days</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handlePreset("thisWeek")}>This week</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handlePreset("thisMonth")}>This month</DropdownMenuItem>
            <DropdownMenuItem disabled className="text-muted-foreground text-xs">
              Custom range (coming soon)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Compare Toggle */}
        <div className="flex items-center gap-2">
          <Switch
            checked={compareEnabled}
            onCheckedChange={setCompareEnabled}
            id="compare"
          />
          <Label htmlFor="compare" className="text-sm font-normal cursor-pointer">
            Compare
          </Label>
        </div>

        {/* Compare Mode */}
        {compareEnabled && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8" suppressHydrationWarning>
                {compareMode === "prev" ? "Previous period" : compareMode === "month" ? "Previous month" : "Custom"}
                <ChevronDown className="ml-2 size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setCompareMode("prev")}>
                Previous period
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCompareMode("month")}>
                Previous month
              </DropdownMenuItem>
              <DropdownMenuItem disabled className="text-muted-foreground text-xs">
                Custom range (coming soon)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Last Updated */}
      <LastUpdatedTime />
    </div>
  );
}

