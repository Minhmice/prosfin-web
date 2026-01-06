"use client";

import Link from "next/link";
import { ProsfinPrimaryButton } from "@/components/shared";
import { cn } from "@/lib/utils";

export interface InsightsCtaProps {
  className?: string;
  serviceSlug?: string; // Optional: pre-select service in RFP
}

/**
 * InsightsCta - CTA component for insights pages
 */
export function InsightsCta({ className, serviceSlug }: InsightsCtaProps) {
  const href = serviceSlug
    ? `/request-proposal?service=${serviceSlug}`
    : "/request-proposal";

  return (
    <div className={cn("text-center space-y-4", className)}>
      <h2 className="text-2xl font-semibold">
        Sẵn sàng nhận tư vấn chuyên sâu?
      </h2>
      <p className="text-muted-foreground">
        Liên hệ với ProsFIN để được tư vấn về các giải pháp phù hợp với doanh
        nghiệp của bạn.
      </p>
      <ProsfinPrimaryButton asChild size="lg">
        <Link href={href}>Gửi yêu cầu tư vấn</Link>
      </ProsfinPrimaryButton>
    </div>
  );
}

