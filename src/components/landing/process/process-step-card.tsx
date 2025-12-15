import * as React from "react";
import { ProsfinProcessCardWrapper } from "@/components/shared/card/prosfin-process-card-wrapper";
import { ProcessStep } from "@/data/process-content";

export interface ProcessStepCardProps {
  /**
   * Step data
   */
  step: ProcessStep;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * ProcessStepCard - Component hiển thị một process step
 * 
 * Sử dụng ProsfinProcessCardWrapper để render nội dung.
 * Component riêng của Process Section.
 */
export function ProcessStepCard({
  step,
  className,
}: ProcessStepCardProps) {
  return (
    <ProsfinProcessCardWrapper
      stepNumber={step.order}
      title={step.title}
      description={step.description}
      outcome={step.outcome}
      className={className}
    />
  );
}

