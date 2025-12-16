"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "@/components/shared/animation/animated-counter";
import { Text } from "@/components/shared";

export interface ProsfinMetricPillProps {
  /**
   * Label text
   */
  label: string;
  /**
   * Value text (số, text ngắn)
   * Nếu là số, sẽ được animate từ 0
   */
  value: string;
  /**
   * Enable animated counter (chỉ khi value là số)
   * @default true
   */
  enableAnimation?: boolean;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * ProsfinMetricPill - Component hiển thị metric/highlight dạng pill
 * 
 * Sử dụng cho highlights, stats, trust indicators.
 * Style: pill với label và value rõ ràng.
 * Hỗ trợ animated counter khi value là số.
 * 
 * Wrapper component không chỉnh sửa shadcn components trực tiếp.
 */
export function ProsfinMetricPill({
  label,
  value,
  enableAnimation = true,
  className,
}: ProsfinMetricPillProps) {
  // Parse value để xác định có phải số không
  const parseValue = (val: string): { num: number | null; prefix: string; suffix: string } => {
    // Match patterns like "120+", "8+", "50+ DN", "+120", "120"
    const match = val.match(/^([+\-]?)(\d+(?:\.\d+)?)(.*)$/);
    if (match) {
      return {
        num: parseFloat(match[2]),
        prefix: match[1] || "",
        suffix: match[3] || "",
      };
    }
    return { num: null, prefix: "", suffix: "" };
  };

  const parsed = parseValue(value);
  const shouldAnimate = enableAnimation && parsed.num !== null;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border bg-card p-4 text-center shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <Text as="div" variant="metric" className="mb-1">
        {shouldAnimate ? (
          <AnimatedCounter
            value={parsed.num!}
            prefix={parsed.prefix}
            suffix={parsed.suffix}
            duration={2000}
          />
        ) : (
          value
        )}
      </Text>
      <Text as="div" variant="caption">
        {label}
      </Text>
    </div>
  );
}

