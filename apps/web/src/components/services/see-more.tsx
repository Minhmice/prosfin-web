"use client";

import type { Service } from "@/types/content";
import { ServiceCard } from "./service-card";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { getRelatedServices } from "@/lib/content/services";
import { AppBadge } from "@/components/shared/wrappers/app-badge";

interface SeeMoreProps {
  services: Service[];
  currentSlug: string;
  title?: string;
}

/**
 * SeeMore - Display related services section
 * 
 * Hiển thị 3-4 service cards khác, ưu tiên cùng category.
 * Hiển thị category badge nếu có.
 */
export function SeeMore({
  services,
  currentSlug,
  title = "Xem thêm dịch vụ",
}: SeeMoreProps) {
  // Sử dụng helper để ưu tiên cùng category
  const relatedServices = getRelatedServices(currentSlug, 4);

  if (relatedServices.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <ProsfinSectionHeading title={title} align="left" titleSize="lg" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {relatedServices.map((service) => (
          <div key={service.id} className="space-y-2">
            {service.category && (
              <AppBadge variant="outline" className="text-xs">
                {service.category}
              </AppBadge>
            )}
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </div>
  );
}

