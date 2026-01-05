/**
 * ServicesRecommended - Recommended block
 * 
 * Shows recommended services based on preset and click history.
 */

"use client";

import * as React from "react";
import type { Service } from "@/types/content";
import type { ServicePreset } from "@/data/service-presets";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { ServiceCardExplorer } from "./service-card-explorer";
import { getRecommendedServices } from "@/lib/services-explorer/score";

interface ServicesRecommendedProps {
  services: Service[];
  preset?: ServicePreset;
  limit?: number;
  className?: string;
}

/**
 * ServicesRecommended - Recommended services section
 */
export function ServicesRecommended({
  services,
  preset,
  limit = 3,
  className,
}: ServicesRecommendedProps) {
  const recommended = React.useMemo(() => {
    return getRecommendedServices(services, preset, limit);
  }, [services, preset, limit]);

  if (recommended.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <ProsfinSectionHeading
        title="Đề xuất cho bạn"
        subtitle="Các dịch vụ phù hợp dựa trên nhu cầu của bạn"
        align="left"
        titleSize="lg"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recommended.map((service) => (
          <ServiceCardExplorer key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}

