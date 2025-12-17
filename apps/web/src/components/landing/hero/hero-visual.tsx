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
            showBorder={true}
            dashed={true}
          />
        )}
      </div>
    </div>
  );
}

