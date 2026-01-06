"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { InsightsFilters, FilterOption } from "@/lib/insights/getInsightsFilters";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface InsightsFilterBarProps {
  filters: InsightsFilters;
}

/**
 * InsightsFilterBar - Filter bar component for insights hub
 * 
 * Displays: Topic tabs, Format dropdown, Sort, Clear filters
 */
export function InsightsFilterBar({ filters }: InsightsFilterBarProps) {
  const searchParams = useSearchParams();
  const currentTopic = searchParams.get("topic");
  const currentFormat = searchParams.get("format");
  const currentSort = searchParams.get("sort") || "newest";

  const buildUrl = (params: Record<string, string | null>) => {
    const newParams = new URLSearchParams();
    
    if (params.topic) newParams.set("topic", params.topic);
    if (params.format) newParams.set("format", params.format);
    if (params.sort && params.sort !== "newest") newParams.set("sort", params.sort);
    
    const queryString = newParams.toString();
    return `/insights${queryString ? `?${queryString}` : ""}`;
  };

  const clearFilters = () => {
    window.location.href = "/insights";
  };

  const hasActiveFilters = currentTopic || currentFormat || currentSort !== "newest";

  return (
    <div className="sticky top-16 z-40 bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {/* Topic Tabs */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-muted-foreground self-center">
              Chủ đề:
            </span>
            <Link
              href="/insights"
              className={cn(
                "inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                !currentTopic
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              Tất cả
            </Link>
            {filters.topics.map((topic) => (
              <Link
                key={topic.id}
                href={buildUrl({
                  topic: topic.slug,
                  format: currentFormat,
                  sort: currentSort,
                })}
                className={cn(
                  "inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  currentTopic === topic.slug
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {topic.label}
                {topic.count > 0 && (
                  <span className="ml-2 text-xs opacity-70">
                    ({topic.count})
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Format & Sort */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Loại:
              </span>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={buildUrl({
                    topic: currentTopic,
                    format: null,
                    sort: currentSort,
                  })}
                  className={cn(
                    "inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    !currentFormat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  Tất cả
                </Link>
                {filters.formats.map((format) => (
                  <Link
                    key={format.id}
                    href={buildUrl({
                      topic: currentTopic,
                      format: format.slug,
                      sort: currentSort,
                    })}
                    className={cn(
                      "inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                      currentFormat === format.slug
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {format.label}
                    {format.count > 0 && (
                      <span className="ml-2 text-xs opacity-70">
                        ({format.count})
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Sắp xếp:
              </span>
              <Link
                href={buildUrl({
                  topic: currentTopic,
                  format: currentFormat,
                  sort: "newest",
                })}
                className={cn(
                  "text-sm",
                  currentSort === "newest"
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Mới nhất
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link
                href={buildUrl({
                  topic: currentTopic,
                  format: currentFormat,
                  sort: "oldest",
                })}
                className={cn(
                  "text-sm",
                  currentSort === "oldest"
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Cũ nhất
              </Link>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="ml-auto"
              >
                Xóa bộ lọc
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

