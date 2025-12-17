"use client";

import * as React from "react";
import { AppSection, AppContainer, SectionHeader } from "@/components/shared";
import { FaqList } from "./faq-list";
import { type LandingContent } from "@/lib/content/types";

interface FaqSectionProps {
  content?: LandingContent["faq"];
}

/**
 * FaqSection - Main component cho FAQ Section
 * 
 * Entry point cho FAQ Section. Nhận content từ adapter layer.
 */
export function FaqSection({ content }: FaqSectionProps) {
  if (!content || !content.items || content.items.length === 0) {
    return null;
  }

  return (
    <AppSection id="faq" padding="lg" background="muted">
      <AppContainer>
        <div className="flex flex-col gap-8 md:gap-12">
          <SectionHeader
            eyebrow={content.eyebrow}
            title={content.title}
            subtitle={content.subtitle}
            align="center"
            cta={content.cta}
          />

          <FaqList items={content.items} />
        </div>
      </AppContainer>
    </AppSection>
  );
}

