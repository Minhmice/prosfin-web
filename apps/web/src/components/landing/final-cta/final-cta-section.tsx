/**
 * FinalCtaSection - Final CTA + Contact form
 * 
 * 2 cột: CTA copy bên trái + Contact form bên phải.
 */

"use client";

import * as React from "react";
import { AppSection, AppContainer, SectionHeader } from "@/components/shared";
import { ContactPanel } from "../contact/contact-panel";
import { FinalCtaBullets } from "../contact/final-cta-bullets";
import { type LandingContent } from "@/lib/content/types";
import { contactSectionContent } from "@/data/contact-content";

interface FinalCtaSectionProps {
  content?: LandingContent["finalCta"];
}

/**
 * FinalCtaSection - Final CTA component
 * 
 * @example
 * ```tsx
 * <FinalCtaSection content={landingContent.finalCta} />
 * ```
 */
export function FinalCtaSection({ content }: FinalCtaSectionProps) {
  const handleContactSubmit = (data: unknown) => {
    // TODO: Connect to API endpoint /api/leads or Supabase
    console.log("Contact form submitted:", data);
    alert("Thông tin đã được ghi nhận (demo). Chúng tôi sẽ liên hệ với bạn sớm nhất!");
  };

  return (
    <AppSection id="contact" padding="lg" background="primary">
      <AppContainer>
        <div className="flex flex-col gap-8 md:gap-12 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
          {/* Cột trái - CTA Copy */}
          <div className="flex flex-col gap-6">
            <SectionHeader
              eyebrow={content?.eyebrow || contactSectionContent.eyebrow}
              title={content?.title || contactSectionContent.title}
              subtitle={content?.subtitle || contactSectionContent.subtitle}
              align="left"
            />
            <FinalCtaBullets bullets={contactSectionContent.bullets} />
            {contactSectionContent.notePrivacy && (
              <p className="text-sm text-muted-foreground">
                {contactSectionContent.notePrivacy}
              </p>
            )}
          </div>

          {/* Cột phải - Contact Panel */}
          <div>
            <ContactPanel
              contactInfo={contactSectionContent.contactInfo}
              onSubmitLead={handleContactSubmit}
              submitLabel={contactSectionContent.primaryCtaLabel}
            />
          </div>
        </div>
      </AppContainer>
    </AppSection>
  );
}

