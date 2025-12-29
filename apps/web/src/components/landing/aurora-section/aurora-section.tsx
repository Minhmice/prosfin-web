"use client";

import * as React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { PageContainer } from "@/components/shared/page-container";
import { cn } from "@/lib/utils";

interface AuroraSectionProps {
  children?: React.ReactNode;
  className?: string;
  showRadialGradient?: boolean;
}

/**
 * AuroraSection - Section với Aurora background effect
 * 
 * Wrapper component sử dụng AuroraBackground với layout phù hợp cho landing page.
 * Component này sẽ được đặt sau HeroSection để tạo hiệu ứng background đẹp mắt.
 * 
 * @example
 * ```tsx
 * <AuroraSection>
 *   <div className="text-center">
 *     <h2>Your content here</h2>
 *   </div>
 * </AuroraSection>
 * ```
 */
export function AuroraSection({
  children,
  className,
  showRadialGradient = true,
}: AuroraSectionProps) {
  return (
    <AuroraBackground
      className={cn("min-h-[60vh] py-16 sm:py-24 lg:py-32", className)}
      showRadialGradient={showRadialGradient}
    >
      <PageContainer className="relative z-10">
        {children}
      </PageContainer>
    </AuroraBackground>
  );
}

