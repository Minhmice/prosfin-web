"use client";

import type { Service } from "@/types/content";
import { ServiceHero } from "./service-hero";
import { ServiceSections } from "./service-sections";
import { ExecutiveBriefLayout } from "./layouts/executive-brief-layout";
import { JourneyRoadmapLayout } from "./layouts/journey-roadmap-layout";
import { ToolkitModulesLayout } from "./layouts/toolkit-modules-layout";
import { TransformationStoryLayout } from "./layouts/transformation-story-layout";

interface ServiceRendererProps {
  service: Service;
}

/**
 * ServiceRenderer - Main renderer for service detail page
 * 
 * Render service content theo layoutVariant.
 * Phase 2: implement 4 variants mới (executive-brief, journey-roadmap, toolkit-modules, transformation-story)
 */
export function ServiceRenderer({ service }: ServiceRendererProps) {
  const { layoutVariant, sections } = service;

  // Filter out hero và ctaInline sections (render riêng)
  const contentSections = sections.filter(
    (s) => s.type !== "hero" && s.type !== "ctaInline"
  );

  // Render theo variant
  switch (layoutVariant) {
    case "advisor":
      return (
        <div className="space-y-12">
          <ServiceHero service={service} layoutVariant="advisor" />
          <ServiceSections sections={contentSections} />
        </div>
      );

    case "execution-coaching":
      return (
        <div className="space-y-12">
          <ServiceHero service={service} layoutVariant="execution-coaching" />
          <ServiceSections sections={contentSections} />
        </div>
      );

    case "executive-brief":
      return <ExecutiveBriefLayout service={service} />;

    case "journey-roadmap":
      return <JourneyRoadmapLayout service={service} />;

    case "toolkit-modules":
      return <ToolkitModulesLayout service={service} />;

    case "transformation-story":
      return <TransformationStoryLayout service={service} />;

    default:
      // Generic layout cho các variant còn lại
      return (
        <div className="space-y-12">
          <ServiceHero service={service} layoutVariant={layoutVariant} />
          <ServiceSections sections={contentSections} />
        </div>
      );
  }
}

