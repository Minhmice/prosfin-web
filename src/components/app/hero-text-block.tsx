"use client";

import * as React from "react";
import { ProsfinButton } from "@/components/shared/prosfin-button";
import { HeroContent } from "@/data/heroContent";
import { cn } from "@/lib/utils";

interface HeroTextBlockProps {
  content: HeroContent;
  onPrimaryCtaClick?: () => void;
  className?: string;
}

/**
 * HeroTextBlock - Phần text bên trái của Hero Section
 * 
 * Hiển thị eyebrow, headline, subheadline, CTA buttons và note.
 * Wrapper component không chỉnh sửa shadcn components trực tiếp.
 */
export function HeroTextBlock({
  content,
  onPrimaryCtaClick,
  className,
}: HeroTextBlockProps) {
  const handlePrimaryCta = () => {
    if (onPrimaryCtaClick) {
      onPrimaryCtaClick();
    } else if (content.primaryCta.href.startsWith("#")) {
      // Scroll to anchor or trigger modal
      const element = document.querySelector(content.primaryCta.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleSecondaryCta = () => {
    if (content.secondaryCta.href.startsWith("#")) {
      // Anchor link - scroll to section
      const element = document.querySelector(content.secondaryCta.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (content.secondaryCta.href.startsWith("/")) {
      // Page link - navigate to page
      window.location.href = content.secondaryCta.href;
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Eyebrow / Label */}
      {content.eyebrow && (
        <div className="text-sm font-medium text-primary/80">
          {content.eyebrow}
        </div>
      )}

      {/* Headline */}
      <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        {content.headline}
      </h1>

      {/* Subheadline */}
      <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
        {content.subheadline}
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <ProsfinButton
          brandVariant="primary"
          size="lg"
          onClick={handlePrimaryCta}
          className="w-full sm:w-auto"
        >
          {content.primaryCta.label}
        </ProsfinButton>

        <ProsfinButton
          brandVariant="outline"
          size="lg"
          onClick={handleSecondaryCta}
          className="w-full sm:w-auto"
        >
          {content.secondaryCta.label}
        </ProsfinButton>
      </div>

      {/* Note / Microcopy */}
      {content.note && (
        <p className="text-sm text-muted-foreground">{content.note}</p>
      )}
    </div>
  );
}

