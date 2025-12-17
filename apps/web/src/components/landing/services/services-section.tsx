"use client";

import * as React from "react";
import { servicesSectionContent } from "@/data/services-content";
import { ProsfinSectionWrapper } from "@/components/shared";
import { RevealOnScroll } from "@/components/shared/animation/reveal-on-scroll";
import { ServicesHeader } from "./services-header";
import { ServicesGrid } from "./services-grid";

export interface ServicesSectionProps {
  /**
   * Handler khi click CTA trong service card
   */
  onServiceCtaClick?: (serviceId: string, ctaType?: string) => void;
}

/**
 * ServicesSection - Main component cho Services Section
 * 
 * Entry point cho Services Section. Import data từ services-content.ts
 * và compose các sub-components.
 * 
 * Client Component (cần xử lý click events cho CTA).
 */
export function ServicesSection({
  onServiceCtaClick,
}: ServicesSectionProps) {
  return (
    <ProsfinSectionWrapper id="services" padding="default" background="default">
      <div className="flex flex-col gap-8 md:gap-12">
        {/* Header */}
        <RevealOnScroll direction="up" delay={0}>
          <ServicesHeader
            eyebrow={servicesSectionContent.eyebrow}
            title={servicesSectionContent.title}
            subtitle={servicesSectionContent.subtitle}
            align="center"
          />
        </RevealOnScroll>

        {/* Services Grid */}
        <RevealOnScroll direction="up" delay={200}>
          <ServicesGrid
            services={servicesSectionContent.services}
            onServiceCtaClick={onServiceCtaClick}
          />
        </RevealOnScroll>
      </div>
    </ProsfinSectionWrapper>
  );
}

