import * as React from "react";
import { HighlightItem } from "@/data/about-content";
import { ProsfinMetricPill } from "@/components/shared/stat/prosfin-metric-pill";
import { cn } from "@/lib/utils";

export interface AboutHighlightsRowProps {
  /**
   * Array of highlights to display
   */
  highlights?: HighlightItem[];
  /**
   * Additional className
   */
  className?: string;
}

/**
 * AboutHighlightsRow - Row hiển thị highlights/metrics
 * 
 * Component riêng của About Section.
 * Sử dụng ProsfinMetricPill để hiển thị từng highlight.
 */
export function AboutHighlightsRow({
  highlights,
  className,
}: AboutHighlightsRowProps) {
  if (!highlights || highlights.length === 0) {
    return null;
  }

  // Determine grid columns based on number of highlights
  const gridColsClass =
    highlights.length <= 2
      ? "md:grid-cols-2"
      : highlights.length === 3
        ? "md:grid-cols-2 lg:grid-cols-3"
        : "md:grid-cols-2 lg:grid-cols-4";

  return (
    <div
      className={cn(
        "grid gap-4",
        "grid-cols-1",
        "sm:grid-cols-2",
        gridColsClass,
        className
      )}
    >
      {highlights.map((highlight) => (
        <ProsfinMetricPill
          key={highlight.id}
          label={highlight.label}
          value={highlight.value}
        />
      ))}
    </div>
  );
}

