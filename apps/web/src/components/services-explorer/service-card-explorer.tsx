/**
 * ServiceCardExplorer - Enhanced service card for explorer
 * 
 * Based on ServiceCardV2 with compare toggle, prefetch link, and click tracking.
 */

"use client";

import * as React from "react";
import Link from "next/link";
import { Bookmark, BookmarkCheck } from "lucide-react";
import type { Service } from "@/types/content";
import { ProsfinServiceCardWrapper } from "@/components/shared/card/service-card-wrapper";
import { ProsfinSecondaryButton } from "@/components/shared/button/secondary-button";
import { AppBadge } from "@/components/shared/wrappers/app-badge";
import { Button } from "@/components/ui/button";
import { mapServiceToTaxonomy } from "@/lib/content/services-taxonomy";
import {
  getPersonaLabel,
  getOutcomeLabel,
} from "@/lib/services-discovery/facets";
import {
  addToCompare,
  removeFromCompare,
  isInCompare,
} from "@/lib/services-explorer/compare-storage";
import { recordServiceClick } from "@/lib/services-explorer/click-history";
import { trackEvent } from "@/lib/analytics";
import { AnalyticsEvent } from "@/lib/analytics-events";
import { cn } from "@/lib/utils";

interface ServiceCardExplorerProps {
  service: Service;
  onCompareChange?: () => void;
}

/**
 * ServiceCardExplorer - Service card with compare functionality
 */
export function ServiceCardExplorer({
  service,
  onCompareChange,
}: ServiceCardExplorerProps) {
  const [inCompare, setInCompare] = React.useState(false);

  React.useEffect(() => {
    setInCompare(isInCompare(service.slug));
  }, [service.slug]);

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inCompare) {
      removeFromCompare(service.slug);
      setInCompare(false);
    } else {
      const current = isInCompare(service.slug);
      if (!current) {
        addToCompare(service.slug);
        setInCompare(true);
      }
    }
    onCompareChange?.();
  };

  const handleCardClick = () => {
    recordServiceClick(service.slug);
    trackEvent(AnalyticsEvent.SERVICE_CARD_CLICKED, {
      service_slug: service.slug,
      service_title: service.title,
    });
  };

  const mapped = mapServiceToTaxonomy(service);

  return (
    <div className="relative">
      <Link
        href={`/services/${service.slug}`}
        onClick={handleCardClick}
        prefetch={true}
        className="block"
      >
        <ProsfinServiceCardWrapper
          title={service.title}
          description={service.excerpt}
          coverImage={service.coverImage}
          cta={
            <ProsfinSecondaryButton
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
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
          </div>
        </ProsfinServiceCardWrapper>
      </Link>

      {/* Compare toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-sm",
          inCompare && "bg-primary/10"
        )}
        onClick={handleCompareToggle}
        aria-label={inCompare ? "Bỏ khỏi so sánh" : "Thêm vào so sánh"}
      >
        {inCompare ? (
          <BookmarkCheck className="h-4 w-4 text-primary" />
        ) : (
          <Bookmark className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}

