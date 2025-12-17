"use client";

import * as React from "react";
import { cn } from "@prosfin/ui";

interface ChartContainerProps {
  children: React.ReactNode;
  className?: string;
  config?: {
    [key: string]: {
      label?: string;
      color?: string;
    };
  };
}

/**
 * ChartContainer wrapper for Recharts
 * Ensures proper sizing and responsive behavior
 * Based on shadcn chart pattern
 */
export function ChartContainer({ children, className, config }: ChartContainerProps) {
  return (
    <div className={cn("w-full", className)}>
      {children}
    </div>
  );
}

