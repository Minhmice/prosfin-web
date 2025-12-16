import * as React from "react";
import { ProsfinServiceCardWrapper } from "@/components/shared";
import { ProsfinButton } from "@/components/shared";
import { ServiceItem } from "@/data/services-content";

export interface ServiceCardProps {
  /**
   * Service data
   */
  service: ServiceItem;
  /**
   * CTA click handler
   */
  onCtaClick?: (serviceId: string, ctaType?: string) => void;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * ServiceCard - Component hiển thị một service
 * 
 * Sử dụng ProsfinServiceCardWrapper để render nội dung.
 * Component riêng của Services Section.
 */
export function ServiceCard({
  service,
  onCtaClick,
  className,
}: ServiceCardProps) {
  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick(service.id, service.ctaType);
    } else if (service.ctaType === "scroll" && service.ctaTarget) {
      const element = document.querySelector(service.ctaTarget);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (service.ctaType === "link" && service.ctaTarget) {
      window.location.href = service.ctaTarget;
    }
  };

  return (
    <ProsfinServiceCardWrapper
      title={service.name}
      description={service.shortDescription}
      benefits={service.pillBenefits}
      idealClient={service.idealClient}
      className={className}
      cta={
        service.ctaLabel ? (
          <ProsfinButton
            brandVariant="outline"
            size="sm"
            onClick={handleCtaClick}
            className="w-full"
          >
            {service.ctaLabel}
          </ProsfinButton>
        ) : undefined
      }
    />
  );
}

