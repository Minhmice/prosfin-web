"use client";

import Link from "next/link";
import type { Service } from "@/types/content";
import { ProsfinServiceCardWrapper } from "@/components/shared/card/service-card-wrapper";
import { ProsfinSecondaryButton } from "@/components/shared/button/secondary-button";
import { AppBadge } from "@/components/shared/wrappers/app-badge";

interface ServiceCardProps {
  service: Service;
}

/**
 * ServiceCard - Card component for displaying service in grid
 * 
 * Hiển thị service card với title, excerpt, variant badge và CTA button.
 */
export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <ProsfinServiceCardWrapper
      title={service.title}
      description={service.excerpt}
      coverImage={service.coverImage}
      icon={
        <AppBadge variant="outline" className="text-xs">
          {service.layoutVariant}
        </AppBadge>
      }
      cta={
        <ProsfinSecondaryButton href={`/services/${service.slug}`} className="w-full">
          Xem chi tiết
        </ProsfinSecondaryButton>
      }
    />
  );
}

