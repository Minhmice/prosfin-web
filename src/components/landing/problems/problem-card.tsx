import * as React from "react";
import { ProsfinProblemCardWrapper } from "@/components/shared/card/prosfin-problem-card-wrapper";
import { Problem } from "@/data/problem-content";

export interface ProblemCardProps {
  /**
   * Problem data
   */
  problem: Problem;
  /**
   * Optional icon
   */
  icon?: React.ReactNode;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * ProblemCard - Component hiển thị một problem/pain point
 * 
 * Sử dụng ProsfinProblemCardWrapper để render nội dung.
 * Component riêng của Problem Section.
 */
export function ProblemCard({
  problem,
  icon,
  className,
}: ProblemCardProps) {
  return (
    <ProsfinProblemCardWrapper
      title={problem.title}
      description={problem.description}
      impact={problem.impact}
      icon={icon}
      className={className}
    />
  );
}

