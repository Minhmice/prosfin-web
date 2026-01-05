/**
 * ToolRecommendedServices - Recommended services from tool result
 * 
 * Display recommended services with "Open in Explorer" link (prefill filters).
 */

import type { ToolResult } from "@/types/tools";
import { getRecommendedServices } from "@/lib/recommendations/tool-reco";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { ProsfinServiceCardWrapper } from "@/components/shared/card/service-card-wrapper";
import { ProsfinSecondaryButton } from "@/components/shared/button/secondary-button";
import Link from "next/link";

interface ToolRecommendedServicesProps {
  result: ToolResult;
}

/**
 * ToolRecommendedServices - Display recommended services
 */
export function ToolRecommendedServices({ result }: ToolRecommendedServicesProps) {
  const services = getRecommendedServices(result);

  if (services.length === 0) return null;

  return (
    <div className="space-y-6">
      <ProsfinSectionHeading
        title="Dịch vụ phù hợp"
        subtitle="Dựa trên kết quả phân tích, chúng tôi đề xuất các dịch vụ sau"
        align="left"
        titleSize="lg"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ProsfinServiceCardWrapper
            key={service.slug}
            title={service.title}
            cta={
              <div className="flex flex-col gap-2">
                <ProsfinSecondaryButton href={service.href} className="w-full">
                  Xem chi tiết
                </ProsfinSecondaryButton>
                <Link
                  href={`/services?slug=${service.slug}`}
                  className="text-center text-sm text-primary hover:underline"
                >
                  Mở trong Explorer
                </Link>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}

