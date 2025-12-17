/**
 * Landing Page
 * 
 * Main landing page composition using content adapter layer.
 * All content comes from getLandingContent() - can be swapped for DB/API in Phase 3.
 */

import type { Metadata } from "next";
import { getLandingContent } from "@/lib/content/landing";

export const metadata: Metadata = {
  title: "Trang chủ",
  description:
    "ProsFIN đồng hành cùng chủ doanh nghiệp trong việc hiểu đúng lãi – lỗ, kiểm soát dòng tiền và giảm rủi ro thuế.",
  openGraph: {
    title: "ProsFIN - Tư vấn tài chính doanh nghiệp chuẩn Big4",
    description:
      "ProsFIN đồng hành cùng chủ doanh nghiệp trong việc hiểu đúng lãi – lỗ, kiểm soát dòng tiền và giảm rủi ro thuế.",
    url: "/",
  },
};
import { HeroSection } from "@/components/landing/hero/hero-section";
import { TrustBarSection } from "@/components/landing/trust-bar/trust-bar-section";
import { SolutionsSection } from "@/components/landing/solutions/solutions-section";
import { ServicesPreviewSection } from "@/components/landing/services-preview/services-preview-section";
import { ProcessPreviewSection } from "@/components/landing/process-preview/process-preview-section";
import { ProofSection } from "@/components/landing/proof/proof-section";
import { ContentPreviewSection } from "@/components/landing/content-preview/content-preview-section";
import { FaqSection } from "@/components/landing/faq/faq-section";
import { FinalCtaSection } from "@/components/landing/final-cta/final-cta-section";

export default function Home() {
  const content = getLandingContent();

  return (
    <>
      <HeroSection content={content.hero} />
      <TrustBarSection content={content.trust} />
      <SolutionsSection content={content.solutions} />
      <ServicesPreviewSection content={content.servicesPreview} />
      <ProcessPreviewSection content={content.processPreview} />
      <ProofSection content={content.proof} />
      <ContentPreviewSection content={content.contentPreview} />
      <FaqSection content={content.faq} />
      <FinalCtaSection content={content.finalCta} />
    </>
  );
}
