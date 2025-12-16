"use client";

import * as React from "react";
import Image from "next/image";
import { HeroContent } from "@/data/heroContent";
import { HeroImagePlaceholder } from "@/components/shared/image-placeholder";
import { Text } from "@/components/shared";
import { cn } from "@/lib/utils";

interface HeroVisualProps {
  content: HeroContent;
  className?: string;
}

/**
 * HeroVisual - Phần visual bên phải của Hero Section
 * 
 * Hiển thị hero image và overlay stats card.
 * Wrapper component sử dụng Next.js Image.
 */
export function HeroVisual({ content, className }: HeroVisualProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Hero Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg max-h-[260px] sm:max-h-[320px] sm:aspect-square lg:max-h-none lg:aspect-[4/3]">
        {/* Placeholder nếu chưa có ảnh */}
        {content.heroImage ? (
          <Image
            src={content.heroImage}
            alt="ProsFIN Dashboard Mockup"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          />
        ) : (
          <HeroImagePlaceholder
            className="absolute inset-0 h-full w-full"
            aspectRatio="auto"
            showBorder={true}
            dashed={true}
            label="Dashboard Mockup"
            icon="📊"
          />
        )}
      </div>

      {/* Stats Overlay Card */}
      {content.stats && content.stats.length > 0 && (
        <div className="absolute -bottom-4 left-4 right-4 rounded-lg border bg-background/95 p-4 shadow-lg backdrop-blur-sm sm:left-8 sm:right-auto sm:w-auto">
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {content.stats.map((stat, index) => (
              <div key={index} className="flex flex-col">
                <Text as="div" variant="metric">
                  {stat.value}
                </Text>
                <Text as="div" variant="caption">
                  {stat.label}
                </Text>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

