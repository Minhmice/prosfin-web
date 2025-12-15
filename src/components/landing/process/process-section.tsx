import * as React from "react";
import { processSectionContent } from "@/data/process-content";
import { ProsfinSectionWrapper } from "@/components/shared/section/prosfin-section-wrapper";
import { ProcessHeader } from "./process-header";
import { ProcessStepsGrid } from "./process-steps-grid";

export interface ProcessSectionProps {
  /**
   * Optional CTA click handler
   */
  onCtaClick?: () => void;
}

/**
 * ProcessSection - Main component cho Process Section
 * 
 * Entry point cho Process Section. Import data từ process-content.ts
 * và compose các sub-components.
 * 
 * Server Component (không có state phức tạp, chỉ render UI).
 */
export function ProcessSection({ onCtaClick }: ProcessSectionProps) {
  return (
    <ProsfinSectionWrapper
      id="process"
      padding="default"
      background="muted"
    >
      <div className="flex flex-col gap-12">
        {/* Header */}
        <ProcessHeader
          eyebrow={processSectionContent.eyebrow}
          title={processSectionContent.title}
          subtitle={processSectionContent.subtitle}
          align="center"
        />

        {/* Steps Grid */}
        <ProcessStepsGrid
          steps={processSectionContent.steps}
          layout="horizontal"
        />
      </div>
    </ProsfinSectionWrapper>
  );
}

