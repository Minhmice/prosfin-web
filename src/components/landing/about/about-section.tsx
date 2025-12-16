"use client";

import * as React from "react";
import { aboutSectionContent } from "@/data/about-content";
import { ProsfinSectionWrapper } from "@/components/shared";
import { RevealOnScroll } from "@/components/shared/animation/reveal-on-scroll";
import { AboutHeader } from "./about-header";
import { AboutHighlightsRow } from "./about-highlights-row";
import { AboutValuesRow } from "./about-values-row";
import { TeamGrid } from "./team-grid";

/**
 * AboutSection - Main component cho About/Team Section
 * 
 * Entry point cho About Section. Import data từ about-content.ts
 * và compose các sub-components.
 * 
 * Server Component (không có state phức tạp, chỉ render UI).
 */
export function AboutSection() {
  return (
    <ProsfinSectionWrapper id="about" padding="default" background="default">
      <div className="flex flex-col gap-8 md:gap-12">
        {/* Header */}
        <RevealOnScroll direction="up" delay={0}>
          <AboutHeader
            eyebrow={aboutSectionContent.eyebrow}
            title={aboutSectionContent.title}
            introParagraph={aboutSectionContent.introParagraph}
            align="left"
          />
        </RevealOnScroll>

        {/* Highlights */}
        {aboutSectionContent.highlights && (
          <RevealOnScroll direction="up" delay={100}>
            <AboutHighlightsRow highlights={aboutSectionContent.highlights} />
          </RevealOnScroll>
        )}

        {/* Values/Working Style */}
        {aboutSectionContent.valuesOrStyle && (
          <RevealOnScroll direction="up" delay={200}>
            <AboutValuesRow values={aboutSectionContent.valuesOrStyle} />
          </RevealOnScroll>
        )}

        {/* Team Grid */}
        <RevealOnScroll direction="up" delay={300}>
          <TeamGrid team={aboutSectionContent.team} />
        </RevealOnScroll>
      </div>
    </ProsfinSectionWrapper>
  );
}

