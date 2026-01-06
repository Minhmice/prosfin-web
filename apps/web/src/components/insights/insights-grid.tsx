"use client";

import type { InsightPost } from "@/content/insights.posts";
import { InsightsCard } from "./insights-card";
import { cn } from "@/lib/utils";

export interface InsightsGridProps {
  insights: InsightPost[];
  className?: string;
}

/**
 * InsightsGrid - Grid layout for insights results
 */
export function InsightsGrid({ insights, className }: InsightsGridProps) {
  if (insights.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Không có kết quả. Hãy thử bỏ bớt bộ lọc.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
        className
      )}
    >
      {insights.map((insight) => (
        <InsightsCard key={insight.slug} insight={insight} />
      ))}
    </div>
  );
}

