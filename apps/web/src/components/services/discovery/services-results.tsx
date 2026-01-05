"use client";

import type { Service } from "@/types/content";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { ServiceCardV2 } from "./service-card-v2";
import { ServicesEmptyState } from "./services-empty-state";
import { getFeaturedServices } from "@/lib/content/services";
import type { WizardAnswers } from "@/lib/services-discovery/params";
import { parseSearchParams } from "@/lib/services-discovery/params";

interface ServicesResultsProps {
  services: Service[];
  mode?: "recommended" | "all";
  searchParams?: URLSearchParams;
  onOpenWizard?: () => void;
}

/**
 * ServicesResults - Display filtered services in grid layout
 * 
 * Features:
 * - Section label: "Gợi ý cho bạn" (if rec=1) or "Tất cả dịch vụ"
 * - Grid layout: 3 cols (desktop), 2 (md), 1 (sm)
 * - Empty state with featured fallback
 */
export function ServicesResults({
  services,
  mode = "all",
  searchParams,
  onOpenWizard,
}: ServicesResultsProps) {
  // Parse wizard answers from searchParams for recommendation reasons
  const wizardAnswers: WizardAnswers | undefined = searchParams
    ? (() => {
        const filters = parseSearchParams(searchParams);
        if (filters.rec === "1") {
          return {
            persona: filters.persona,
            outcome: filters.outcome,
            stage: filters.stage,
            format: filters.format,
          };
        }
        return undefined;
      })()
    : undefined;

  const featuredServices = getFeaturedServices(services, 3);

  if (services.length === 0) {
    return (
      <div id="services-results">
        <ServicesEmptyState
          onOpenWizard={onOpenWizard}
          featuredServices={featuredServices}
        />
      </div>
    );
  }

  return (
    <div id="services-results" className="space-y-6">
      <ProsfinSectionHeading
        title={mode === "recommended" ? "Gợi ý cho bạn" : "Tất cả dịch vụ"}
        align="left"
        titleSize="lg"
      />
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCardV2
            key={service.id}
            service={service}
            wizardAnswers={wizardAnswers}
          />
        ))}
      </div>
    </div>
  );
}

