"use client";

import Link from "next/link";
import type { Service } from "@/types/content";
import { ProsfinServiceCardWrapper } from "@/components/shared/card/service-card-wrapper";
import { ProsfinSecondaryButton } from "@/components/shared/button/secondary-button";
import { AppBadge } from "@/components/shared/wrappers/app-badge";
import { mapServiceToTaxonomy } from "@/lib/content/services-taxonomy";
import {
  getPersonaLabel,
  getOutcomeLabel,
} from "@/lib/services-discovery/facets";
import type { WizardAnswers } from "@/lib/services-discovery/params";
import { getRecommendationReasons } from "@/lib/services-discovery/scoring";

interface ServiceCardV2Props {
  service: Service;
  wizardAnswers?: WizardAnswers; // For showing recommendation reasons
}

/**
 * ServiceCardV2 - Enhanced service card with taxonomy metadata
 * 
 * Displays:
 * - Personas (Dành cho)
 * - Outcomes (Kết quả)
 * - Time-to-value
 * - Recommendation reasons (if wizardAnswers provided)
 */
export function ServiceCardV2({
  service,
  wizardAnswers,
}: ServiceCardV2Props) {
  const mapped = mapServiceToTaxonomy(service);
  const reasons = wizardAnswers
    ? getRecommendationReasons(service, wizardAnswers)
    : [];

  return (
    <ProsfinServiceCardWrapper
      title={service.title}
      description={service.excerpt}
      coverImage={service.coverImage}
      cta={
        <ProsfinSecondaryButton
          href={`/services/${service.slug}`}
          className="w-full"
        >
          Xem chi tiết
        </ProsfinSecondaryButton>
      }
    >
      <div className="space-y-3">
        {/* Personas */}
        {mapped.personas && mapped.personas.length > 0 && (
          <div>
            <div className="mb-2 text-xs font-medium text-muted-foreground">
              Dành cho:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {mapped.personas.map((persona) => (
                <AppBadge key={persona} variant="outline" className="text-xs">
                  {getPersonaLabel(persona)}
                </AppBadge>
              ))}
            </div>
          </div>
        )}

        {/* Outcomes */}
        {mapped.outcomes && mapped.outcomes.length > 0 && (
          <div>
            <div className="mb-2 text-xs font-medium text-muted-foreground">
              Kết quả:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {mapped.outcomes.map((outcome) => (
                <AppBadge key={outcome} variant="outline" className="text-xs">
                  {getOutcomeLabel(outcome)}
                </AppBadge>
              ))}
            </div>
          </div>
        )}

        {/* Time-to-value */}
        {mapped.timeToValue && (
          <div>
            <div className="mb-2 text-xs font-medium text-muted-foreground">
              Time-to-value:
            </div>
            <div className="text-sm text-muted-foreground">
              {mapped.timeToValue.label ||
                (mapped.timeToValue.minWeeks &&
                  mapped.timeToValue.maxWeeks &&
                  mapped.timeToValue.minWeeks === mapped.timeToValue.maxWeeks
                  ? `${mapped.timeToValue.minWeeks} tuần`
                  : mapped.timeToValue.minWeeks && mapped.timeToValue.maxWeeks
                    ? `${mapped.timeToValue.minWeeks}-${mapped.timeToValue.maxWeeks} tuần`
                    : mapped.timeToValue.minWeeks
                      ? `Từ ${mapped.timeToValue.minWeeks} tuần`
                      : "")}
            </div>
          </div>
        )}

        {/* Recommendation reasons */}
        {reasons.length > 0 && (
          <div>
            <div className="mb-2 text-xs font-medium text-muted-foreground">
              Vì sao phù hợp?
            </div>
            <div className="flex flex-wrap gap-1.5">
              {reasons.map((reason, index) => (
                <AppBadge
                  key={index}
                  variant="default"
                  className="text-xs"
                >
                  {reason}
                </AppBadge>
              ))}
            </div>
          </div>
        )}
      </div>
    </ProsfinServiceCardWrapper>
  );
}

