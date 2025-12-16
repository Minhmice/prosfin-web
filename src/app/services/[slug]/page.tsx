import { notFound } from "next/navigation";
import { servicesDetailMap } from "@/data/services-detail";
import { ProsfinSectionWrapper } from "@/components/shared";
import { ServiceHero } from "./components/service-hero";
import { ProblemOutcomeSection } from "./components/problem-outcome";
import { StepsSection } from "./components/steps-section";
import { DeliverablesExclusionsSection } from "./components/deliverables-exclusions";
import { ServiceMetaSection } from "./components/service-meta";
import { RelatedCasesSection } from "./components/related-cases";
import { ServiceFaqSection } from "./components/service-faq";
import { ServiceFinalCta } from "./components/final-cta";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Service Detail Page
 * 
 * Trang chi tiết từng dịch vụ.
 */
export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = servicesDetailMap[slug];

  if (!service) {
    notFound();
  }

  const {
    hero,
    problems,
    outcomes,
    steps,
    deliverables,
    exclusions,
    timeline,
    format,
    requirementsFromClient,
    pricingNote,
    relatedCases,
    faqs,
  } = service;

  return (
    <>
      {/* Hero Section */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <ServiceHero
          tags={hero.tags}
          title={hero.title}
          summaryBullets={hero.summaryBullets}
          primaryCta={hero.primaryCta}
          secondaryCta={hero.secondaryCta}
        />
      </ProsfinSectionWrapper>

      {/* Problem → Outcome */}
      <ProsfinSectionWrapper>
        <ProblemOutcomeSection problems={problems} outcomes={outcomes} />
      </ProsfinSectionWrapper>

      {/* Steps */}
      <ProsfinSectionWrapper background="muted">
        <StepsSection steps={steps} />
      </ProsfinSectionWrapper>

      {/* Deliverables & Exclusions */}
      <ProsfinSectionWrapper>
        <DeliverablesExclusionsSection
          deliverables={deliverables}
          exclusions={exclusions}
        />
      </ProsfinSectionWrapper>

      {/* Timeline, Format, Requirements */}
      <ProsfinSectionWrapper background="muted">
        <ServiceMetaSection
          timeline={timeline}
          format={format}
          pricingNote={pricingNote}
          requirementsFromClient={requirementsFromClient}
        />
      </ProsfinSectionWrapper>

      {/* Related Cases */}
      {relatedCases && relatedCases.length > 0 && (
        <ProsfinSectionWrapper>
          <RelatedCasesSection cases={relatedCases} />
        </ProsfinSectionWrapper>
      )}

      {/* FAQ */}
      {faqs && faqs.length > 0 && (
        <ProsfinSectionWrapper background="muted">
          <ServiceFaqSection title="Câu hỏi thường gặp về gói này" faqs={faqs} />
        </ProsfinSectionWrapper>
      )}

      {/* Final CTA */}
      <ProsfinSectionWrapper>
        <ServiceFinalCta />
      </ProsfinSectionWrapper>
    </>
  );
}
