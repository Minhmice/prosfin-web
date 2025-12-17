"use client";

import * as React from "react";
import { H1, Text, ProsfinButton } from "@/components/shared";
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
        <Text as="div" variant="small" className="text-primary/80">
          {content.eyebrow}
        </Text>
      )}

      {/* Headline */}
      <H1 className="leading-tight">{content.headline}</H1>

      {/* Subheadline */}
      <Text
        as="p"
        variant="lead"
        className="max-w-md md:max-w-2xl"
      >
        {content.subheadline}
      </Text>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
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
        <Text as="p" variant="muted">
          {content.note}
        </Text>
      )}
    </div>
  );
}

