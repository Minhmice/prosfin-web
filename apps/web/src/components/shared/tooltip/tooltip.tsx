"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProsfinTooltipProps {
  /**
   * Tooltip label/content
   */
  label: string;
  /**
   * Children (element to show tooltip on)
   */
  children: React.ReactNode;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * ProsfinTooltip - Tooltip wrapper component
 * 
 * Hiển thị tooltip khi hover vào element.
 * Hiện tại dùng native title attribute, có thể nâng cấp với Radix UI Tooltip sau.
 * Wrapper component không chỉnh sửa shadcn components trực tiếp.
 */
export function ProsfinTooltip({
  label,
  children,
  className,
}: ProsfinTooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-md bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md">
          {label}
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-popover" />
        </div>
      )}
    </div>
  );
}

