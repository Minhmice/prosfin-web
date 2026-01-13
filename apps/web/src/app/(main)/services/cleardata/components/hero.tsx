"use client";

import * as React from "react";
import Image from "next/image";
import { Shield, FileText, Users } from "lucide-react";
import { ProsfinSectionWrapper, PageContainer } from "@/components/shared";
import { H1, Text } from "@/components/shared";
import { useInViewAnimation } from "@/hooks/use-in-view-animation";
import { SiteBreadcrumbs, type BreadcrumbItemData } from "@/components/site/breadcrumbs";
import { heroImage } from "./stock-images";
import type { HeroContent } from "@/data/services/cleardata";

export interface HeroSectionProps {
  content: HeroContent;
  breadcrumbItems?: BreadcrumbItemData[];
}

const iconMap: Record<string, React.ReactNode> = {
  "Bảo mật dữ liệu": <Shield className="h-4 w-4" />,
  "Chuẩn hoá số liệu": <FileText className="h-4 w-4" />,
  "Tư vấn trực tiếp": <Users className="h-4 w-4" />,
};

/**
 * HeroSection - Hero section cho ClearData service
 */
export function HeroSection({ content, breadcrumbItems }: HeroSectionProps) {
  const { ref, isInView } = useInViewAnimation({ delay: 100 });

  return (
    <ProsfinSectionWrapper background="muted" padding="lg" className="relative">
      {breadcrumbItems && (
        <div className="absolute top-6 left-0 right-0 z-10">
          <PageContainer>
            <div className="grid grid-cols-12 gap-6 lg:gap-8">
              <div className="col-span-12 lg:col-span-7">
                <SiteBreadcrumbs items={breadcrumbItems} />
              </div>
            </div>
          </PageContainer>
        </div>
      )}
      <div className="grid grid-cols-12 gap-6 lg:gap-12">
        {/* Left Column - Content (7 cols) */}
        <div className="col-span-12 lg:col-span-7 pr-0 lg:pr-8">
          <div
            ref={ref as React.RefObject<HTMLDivElement>}
            className={`transition-opacity duration-700 ${isInView ? "opacity-100" : "opacity-0"}`}
          >
            <H1 className="mb-6">{content.title}</H1>

            <Text as="p" variant="lead" className="mb-8">
              {content.subheadline}
            </Text>

            {/* Bullets */}
            <div className="space-y-4 mb-12">
              {content.bullets.map((bullet, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-foreground mt-2 flex-shrink-0"></div>
                  <Text>{bullet}</Text>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4">
              {content.trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-card"
                >
                  {iconMap[badge.label]}
                  <Text variant="small">{badge.label}</Text>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Hero Image (5 cols) */}
        <div className="col-span-12 lg:col-span-5">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
            <Image
              src={heroImage}
              alt="ProsFIN ClearData - Chuẩn hoá dữ liệu kế toán"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            />
          </div>
        </div>
      </div>
    </ProsfinSectionWrapper>
  );
}

