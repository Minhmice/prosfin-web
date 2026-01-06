"use client";

import type { Service } from "@/types/content";
import type { BreadcrumbItemData } from "@/components/site/breadcrumbs";
import { ServiceHero } from "./service-hero";
import { ServiceSections } from "./service-sections";
import { ExecutiveBriefLayout } from "./layouts/executive-brief-layout";
import { JourneyRoadmapLayout } from "./layouts/journey-roadmap-layout";
import { ToolkitModulesLayout } from "./layouts/toolkit-modules-layout";
import { TransformationStoryLayout } from "./layouts/transformation-story-layout";
import { NarrativeLayout } from "./layouts/narrative-layout";
import { FrameworkLayout } from "./layouts/framework-layout";
import { SplitPanelLayout } from "./layouts/split-panel-layout";
import { TimelineLayout } from "./layouts/timeline-layout";
import { LedgerCockpitLayout } from "@/features/services/layouts/ledger-cockpit-layout";
import { getServicePageConfig } from "@/content/services/registry";

interface ServiceRendererProps {
  service: Service;
  breadcrumbItems?: BreadcrumbItemData[];
}

/**
 * ServiceRenderer - Main renderer for service detail page
 * 
 * Render service content theo layoutVariant.
 * Phase 2: implement 4 variants mới (executive-brief, journey-roadmap, toolkit-modules, transformation-story)
 */
export function ServiceRenderer({ service, breadcrumbItems }: ServiceRendererProps) {
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
          <ServiceHero service={service} layoutVariant="advisor" breadcrumbItems={breadcrumbItems} />
          <ServiceSections sections={contentSections} />
        </div>
      );

    case "execution-coaching":
      return (
        <div className="space-y-12">
          <ServiceHero service={service} layoutVariant="execution-coaching" breadcrumbItems={breadcrumbItems} />
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

    case "narrative":
      return <NarrativeLayout service={service} />;

    case "framework":
      return <FrameworkLayout service={service} />;

    case "split-panel":
      return <SplitPanelLayout service={service} />;

    case "timeline":
      return <TimelineLayout service={service} />;

    case "ledger-cockpit-layout": {
      // Phase 5: Integrate LedgerCockpitLayout with ServicePageConfig
      const pageConfig = getServicePageConfig(service.slug);
      if (pageConfig) {
        return <LedgerCockpitLayout config={pageConfig} service={service} />;
      }
      // Fallback to default layout if config not found
      return (
        <div className="space-y-12">
          <ServiceHero service={service} layoutVariant={layoutVariant} breadcrumbItems={breadcrumbItems} />
          <ServiceSections sections={contentSections} />
        </div>
      );
    }

    default:
      // Generic layout cho các variant còn lại
      return (
        <div className="space-y-12">
          <ServiceHero service={service} layoutVariant={layoutVariant} breadcrumbItems={breadcrumbItems} />
          <ServiceSections sections={contentSections} />
        </div>
      );
  }
}

