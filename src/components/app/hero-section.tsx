"use client";

import * as React from "react";
import { PageContainer } from "@/components/shared/page-container";
import { HeroTextBlock } from "./hero-text-block";
import { HeroVisual } from "./hero-visual";
import { HeroLeadFormModal } from "./hero-lead-form-modal";
import { heroContent } from "@/data/heroContent";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
}

/**
 * HeroSection - Hero Section chính của trang chủ
 * 
 * Layout 2 cột (text + visual) với responsive design.
 * Desktop: grid 2 cột, Mobile: stack dọc.
 * Chiều cao khoảng 80-100vh, padding responsive.
 */
export function HeroSection({ className }: HeroSectionProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handlePrimaryCtaClick = () => {
    setIsModalOpen(true);
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
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Cột trái - Text Block */}
            <div className="order-1 lg:order-1">
              <HeroTextBlock
                content={heroContent}
                onPrimaryCtaClick={handlePrimaryCtaClick}
              />
            </div>

            {/* Cột phải - Visual */}
            <div className="order-2 lg:order-2">
              <HeroVisual content={heroContent} />
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Lead Form Modal */}
      <HeroLeadFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}

