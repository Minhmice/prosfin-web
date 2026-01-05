/**
 * ChipsRow - Horizontal row of chips
 * 
 * Wrapper component for displaying chips in a horizontal row.
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import type { FilterChipProps } from "./filter-chip";
import { FilterChip } from "./filter-chip";

export interface ChipsRowProps {
  chips: Omit<FilterChipProps, "className">[];
  className?: string;
  gap?: "sm" | "md" | "lg";
}

/**
 * ChipsRow - Horizontal row of filter chips
 * 
 * @example
 * ```tsx
 * <ChipsRow
 *   chips={[
 *     { label: "Owner", active: true },
 *     { label: "CFO", active: false },
 *   ]}
 *   gap="md"
 * />
 * ```
 */
export function ChipsRow({ chips, className, gap = "md" }: ChipsRowProps) {
  const gapClass = {
    sm: "gap-2",
    md: "gap-3",
    lg: "gap-4",
  }[gap];

  return (
    <div className={cn("flex flex-wrap items-center", gapClass, className)}>
      {chips.map((chip, index) => (
        <FilterChip key={index} {...chip} />
      ))}
    </div>
  );
}

