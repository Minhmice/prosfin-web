"use client";

import * as React from "react";
import { contactSectionContent } from "@/data/contact-content";
import { ProsfinSectionWrapper } from "@/components/shared";
import { FinalCtaHeader } from "./final-cta-header";
import { FinalCtaBullets } from "./final-cta-bullets";
import { ContactPanel } from "./contact-panel";

export interface FinalCtaSectionProps {
  /**
   * Form submit handler
   */
  onSubmitLead?: (data: unknown) => void;
}

/**
 * FinalCtaSection - Main component cho Final CTA/Contact Section
 * 
 * Entry point cho Contact Section. Import data từ contact-content.ts
 * và compose các sub-components.
 * 
 * Client Component (cần xử lý form submit).
 */
export function FinalCtaSection({
  onSubmitLead,
}: FinalCtaSectionProps) {
  return (
    <ProsfinSectionWrapper
      id="contact"
      padding="lg"
      background="primary"
    >
      <div className="flex flex-col gap-8 md:gap-12 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
        {/* Cột trái - CTA Copy */}
        <div className="flex flex-col gap-6">
          <FinalCtaHeader
            eyebrow={contactSectionContent.eyebrow}
            title={contactSectionContent.title}
            subtitle={contactSectionContent.subtitle}
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
            onSubmitLead={onSubmitLead}
            submitLabel={contactSectionContent.primaryCtaLabel}
          />
        </div>
      </div>
    </ProsfinSectionWrapper>
  );
}

