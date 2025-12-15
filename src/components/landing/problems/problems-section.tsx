"use client";

import * as React from "react";
import { problemSectionContent } from "@/data/problem-content";
import { ProsfinSectionWrapper } from "@/components/shared/section/prosfin-section-wrapper";
import { ProsfinButton } from "@/components/shared/prosfin-button";
import { ProblemsHeader } from "./problems-header";
import { ProblemsGrid } from "./problems-grid";

/**
 * ProblemsSection - Main component cho Problem/Pain Points Section
 * 
 * Entry point cho Problem Section. Import data từ problem-content.ts
 * và compose các sub-components.
 * 
 * Client Component (cần xử lý click events cho CTA).
 */
export function ProblemsSection() {
  const handleCtaClick = () => {
    if (problemSectionContent.cta?.href.startsWith("#")) {
      const element = document.querySelector(problemSectionContent.cta.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <ProsfinSectionWrapper id="problems" padding="default" background="muted">
      <div className="flex flex-col gap-12">
        {/* Header */}
        <ProblemsHeader
          eyebrow={problemSectionContent.eyebrow}
          title={problemSectionContent.title}
          subtitle={problemSectionContent.subtitle}
          align="left"
        />

        {/* Problems Grid */}
        <ProblemsGrid problems={problemSectionContent.problems} />

        {/* Optional CTA */}
        {problemSectionContent.cta && (
          <div className="flex justify-center pt-4">
            <ProsfinButton
              brandVariant="primary"
              size="lg"
              onClick={handleCtaClick}
            >
              {problemSectionContent.cta.label}
            </ProsfinButton>
          </div>
        )}
      </div>
    </ProsfinSectionWrapper>
  );
}

