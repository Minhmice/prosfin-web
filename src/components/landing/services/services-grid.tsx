import * as React from "react";
import { ServiceItem } from "@/data/services-content";
import { ServiceCard } from "./service-card";
import { cn } from "@/lib/utils";

export interface ServicesGridProps {
  /**
   * Array of services to display
   */
  services: ServiceItem[];
  /**
   * CTA click handler
   */
  onServiceCtaClick?: (serviceId: string, ctaType?: string) => void;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * ServicesGrid - Grid layout cho các Service Cards
 * 
 * Responsive grid:
 * - Mobile: 1 cột
 * - Tablet: 2 cột
 * - Desktop: 2-4 cột (tùy số lượng services)
 */
export function ServicesGrid({
  services,
  onServiceCtaClick,
  className,
}: ServicesGridProps) {
  // Determine grid columns based on number of services
  const gridColsClass =
    services.length <= 2
      ? "md:grid-cols-2"
      : services.length === 3
        ? "md:grid-cols-2 lg:grid-cols-3"
        : "md:grid-cols-2 lg:grid-cols-4";

  return (
    <div
      className={cn(
        "grid gap-6",
        "grid-cols-1",
        gridColsClass,
        className
      )}
    >
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onCtaClick={onServiceCtaClick}
        />
      ))}
    </div>
  );
}

