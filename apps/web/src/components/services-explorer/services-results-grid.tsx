/**
 * ServicesResultsGrid - Grid layout for services
 * 
 * Displays services in grid with empty and no-results states.
 */

import * as React from "react";
import type { Service } from "@/types/content";
import { ServiceCardExplorer } from "./service-card-explorer";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { ProsfinPrimaryButton } from "@/components/shared/button/primary-button";
import { cn } from "@/lib/utils";

interface ServicesResultsGridProps {
  services: Service[];
  className?: string;
}

/**
 * ServicesResultsGrid - Results grid component
 */
export function ServicesResultsGrid({
  services,
  className,
}: ServicesResultsGridProps) {
  // Empty state (no services at all)
  if (services.length === 0) {
    return (
      <div className={cn("py-12 text-center", className)}>
        <ProsfinSectionHeading
          title="Chưa có dịch vụ nào"
          subtitle="Hãy thử sử dụng các preset để tìm dịch vụ phù hợp"
          align="center"
          titleSize="lg"
        />
        <div className="mt-6">
          <ProsfinPrimaryButton href="/services">
            Xem tất cả dịch vụ
          </ProsfinPrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCardExplorer key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}

