"use client";

import Link from "next/link";
import type { InsightPost } from "@/content/insights.posts";
import { InsightsCard } from "./insights-card";
import { cn } from "@/lib/utils";

export interface InsightsRelatedProps {
  insights: InsightPost[];
  currentSlug: string;
  title?: string;
  className?: string;
}

/**
 * InsightsRelated - Related insights section
 * 
 * Shows related insights (usually same topic) excluding current insight
 */
export function InsightsRelated({
  insights,
  currentSlug,
  title = "Bài viết liên quan",
  className,
}: InsightsRelatedProps) {
  const related = insights
    .filter((insight) => insight.slug !== currentSlug)
    .slice(0, 6);

  if (related.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-6", className)}>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((insight) => (
          <InsightsCard key={insight.slug} insight={insight} />
        ))}
      </div>
    </div>
  );
}

