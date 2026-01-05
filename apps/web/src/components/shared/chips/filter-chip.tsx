/**
 * FilterChip - Wrapper cho Badge với filter-specific styling
 * 
 * Wrapper component cho filter chips với active/inactive states và count display.
 */

import * as React from "react";
import { AppBadge } from "@/components/shared/wrappers/app-badge";
import { cn } from "@/lib/utils";

export interface FilterChipProps {
  label: string;
  active?: boolean;
  count?: number;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "outline" | "secondary";
}

/**
 * FilterChip - Chip component for filters
 * 
 * @example
 * ```tsx
 * <FilterChip
 *   label="Owner"
 *   active={true}
 *   count={5}
 *   onClick={() => setFilter("owner")}
 * />
 * ```
 */
export function FilterChip({
  label,
  active = false,
  count,
  onClick,
  className,
  variant = "outline",
}: FilterChipProps) {
  const displayLabel = count !== undefined ? `${label} (${count})` : label;

  return (
    <AppBadge
      badgeVariant={active ? "primary" : variant}
      className={cn(
        "cursor-pointer transition-all hover:scale-105",
        active && "ring-2 ring-primary ring-offset-2",
        className
      )}
      onClick={onClick}
    >
      {displayLabel}
    </AppBadge>
  );
}

