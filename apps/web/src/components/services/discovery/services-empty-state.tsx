"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { SearchX } from "lucide-react";
import { ProsfinPrimaryButton } from "@/components/shared/button/primary-button";
import { ProsfinSecondaryButton } from "@/components/shared/button/secondary-button";
import type { Service } from "@/types/content";
import { ServiceCardV2 } from "./service-card-v2";

interface ServicesEmptyStateProps {
  onOpenWizard?: () => void;
  featuredServices?: Service[];
}

/**
 * ServicesEmptyState - Empty state when no services match filters
 * 
 * Shows:
 * - Empty message
 * - Clear filters button
 * - Open wizard button
 * - Featured services fallback
 */
export function ServicesEmptyState({
  onOpenWizard,
  featuredServices = [],
}: ServicesEmptyStateProps) {
  const router = useRouter();

  const clearFilters = () => {
    router.replace("/services");
  };

  return (
    <div className="space-y-8 py-12 text-center">
      <div className="space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <SearchX className="h-8 w-8 text-muted-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Không tìm thấy dịch vụ phù hợp</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Hãy thử xóa bộ lọc hoặc sử dụng wizard để nhận gợi ý phù hợp hơn
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ProsfinPrimaryButton onClick={onOpenWizard}>
            Trả lời 4 câu để nhận gợi ý
          </ProsfinPrimaryButton>
          <ProsfinSecondaryButton onClick={clearFilters}>
            Xóa bộ lọc
          </ProsfinSecondaryButton>
        </div>
      </div>

      {/* Featured services fallback */}
      {featuredServices.length > 0 && (
        <div className="space-y-4 text-left">
          <h4 className="text-center text-base font-semibold">
            Dịch vụ được đề xuất
          </h4>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <ServiceCardV2 key={service.id} service={service} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

