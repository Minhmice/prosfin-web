"use client";

import * as React from "react";
import { PageContainer } from "@/components/shared/page-container";
import { HeroTextBlock } from "./hero-text-block";
import { HeroVisual } from "./hero-visual";
import { MiniLeadFormModal } from "./components/mini-lead-form/mini-lead-form-modal";
import { RevealOnScroll } from "@/components/shared/animation/reveal-on-scroll";
import { useHeroModal } from "./hero-modal-context";
import { cn } from "@/lib/utils";


import { type LandingContent } from "@/lib/content/types";

interface HeroSectionProps {
  content: LandingContent["hero"];
  className?: string;
}

/**
 * HeroSection - Hero Section chính của trang chủ
 * 
 * Layout 2 cột (text + visual) với responsive design.
 * Desktop: grid 2 cột, Mobile: stack dọc.
 * Chiều cao khoảng 80-100vh, padding responsive.
 */
export function HeroSection({ content, className }: HeroSectionProps) {
  const { isModalOpen, openModal, closeModal } = useHeroModal();

  // Convert LandingContent hero to HeroContent format
  const heroContent = {
    eyebrow: content.eyebrow || "",
    headline: content.title,
    subheadline: content.subtitle || "",
    primaryCta: content.cta
      ? {
          label: content.cta.label,
          href: content.cta.href || "#",
        }
      : { label: "Đặt lịch", href: "#" },
    secondaryCta: { label: "Xem dịch vụ", href: "/services" },
    note: "",
    stats: content.stats || [],
    heroImage: content.heroImage || "",
  };

  return (
    <>
      <section
        className={cn(
          "relative min-h-[80vh] py-16 sm:min-h-[85vh] sm:py-24 lg:min-h-[90vh]",
          className
        )}
        id="hero"
      >
        <PageContainer>
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Cột trái - Text Block */}
            <RevealOnScroll direction="right" delay={0} className="order-1 lg:order-1">
              <HeroTextBlock
                content={heroContent}
                onPrimaryCtaClick={openModal}
              />
            </RevealOnScroll>

            {/* Cột phải - Visual */}
            <RevealOnScroll direction="left" delay={100} className="order-2 lg:order-2">
              <HeroVisual content={heroContent} />
            </RevealOnScroll>
          </div>
        </PageContainer>
      </section>

      {/* Mini Lead Form (Step 1) */}
      <MiniLeadFormModal open={isModalOpen} onOpenChange={closeModal} />
    </>
  );
}

