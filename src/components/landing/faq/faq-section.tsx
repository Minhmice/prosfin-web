import * as React from "react";
import { faqSectionContent } from "@/data/faq-content";
import { ProsfinSectionWrapper } from "@/components/shared/section/prosfin-section-wrapper";
import { FaqHeader } from "./faq-header";
import { FaqList } from "./faq-list";

/**
 * FaqSection - Main component cho FAQ Section
 * 
 * Entry point cho FAQ Section. Import data từ faq-content.ts
 * và compose các sub-components.
 * 
 * Server Component (không có state phức tạp, chỉ render UI).
 */
export function FaqSection() {
  return (
    <ProsfinSectionWrapper id="faq" padding="default" background="muted">
      <div className="flex flex-col gap-12">
        {/* Header */}
        <FaqHeader
          eyebrow={faqSectionContent.eyebrow}
          title={faqSectionContent.title}
          subtitle={faqSectionContent.subtitle}
          align="left"
        />

        {/* FAQ List */}
        <FaqList items={faqSectionContent.items} />
      </div>
    </ProsfinSectionWrapper>
  );
}

