import * as React from "react";
import { ProcessStep } from "@/data/process-content";
import { ProcessStepCard } from "./process-step-card";
import { cn } from "@/lib/utils";

export interface ProcessStepsGridProps {
  /**
   * Array of steps to display
   */
  steps: ProcessStep[];
  /**
   * Layout variant
   * @default "horizontal"
   */
  layout?: "horizontal" | "vertical";
  /**
   * Additional className
   */
  className?: string;
}

/**
 * ProcessStepsGrid - Grid layout cho các Process Step Cards
 * 
 * Responsive grid:
 * - Mobile: 1 cột
 * - Tablet: 2 cột (horizontal) hoặc 1 cột (vertical)
 * - Desktop: 4 cột (horizontal) hoặc 1 cột (vertical)
 */
export function ProcessStepsGrid({
  steps,
  layout = "horizontal",
  className,
}: ProcessStepsGridProps) {
  const gridClasses =
    layout === "horizontal"
      ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
      : "grid-cols-1";

  return (
    <div className={cn("grid gap-4 md:gap-6", gridClasses, className)}>
      {steps.map((step) => (
        <ProcessStepCard key={step.id} step={step} />
      ))}
    </div>
  );
}

