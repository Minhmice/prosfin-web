"use client";

import Link from "next/link";
import type { InsightPost } from "@/content/insights.posts";
import { getTopicById, getFormatById } from "@/content/insights.taxonomy";
import { cn } from "@/lib/utils";

export interface InsightsCardProps {
  insight: InsightPost;
  className?: string;
}

/**
 * InsightsCard - Card component for insight in grid
 * 
 * Displays: title, summary, topic badge, format badge, published date
 */
export function InsightsCard({ insight, className }: InsightsCardProps) {
  const topic = getTopicById(insight.topic);
  const format = getFormatById(insight.format);
  const publishedDate = new Date(insight.publishedAt).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/insights/${insight.slug}`}
      className={cn(
        "group block rounded-lg border bg-card p-6 transition-all",
        "hover:border-primary hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      <div className="space-y-4">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {topic && (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {topic.label}
            </span>
          )}
          {format && (
            <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              {format.label}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
          {insight.title}
        </h3>

        {/* Summary */}
        {insight.summary && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {insight.summary}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>{publishedDate}</span>
          {insight.readingTime && (
            <span>{insight.readingTime} phút đọc</span>
          )}
        </div>
      </div>
    </Link>
  );
}

