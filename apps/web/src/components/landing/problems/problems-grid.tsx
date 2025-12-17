import * as React from "react";
import { Problem } from "@/data/problem-content";
import { ProblemCard } from "./problem-card";
import { cn } from "@/lib/utils";

export interface ProblemsGridProps {
  /**
   * Array of problems to display
   */
  problems: Problem[];
  /**
   * Additional className
   */
  className?: string;
}

/**
 * ProblemsGrid - Grid layout cho các Problem Cards
 * 
 * Responsive grid:
 * - Mobile: 1 cột
 * - Tablet: 2 cột
 * - Desktop: 3 cột
 */
export function ProblemsGrid({
  problems,
  className,
}: ProblemsGridProps) {
  return (
    <div
      className={cn(
        "grid gap-6",
        "grid-cols-1",
        "sm:grid-cols-2",
        "lg:grid-cols-3",
        className
      )}
    >
      {problems.map((problem) => (
        <ProblemCard key={problem.id} problem={problem} />
      ))}
    </div>
  );
}

