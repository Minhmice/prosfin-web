"use client";

/**
 * ClearData Page Content
 * 
 * Main page composition cho ProsFIN ClearData™ service page.
 * Compose tất cả sections theo đúng thứ tự.
 */

import * as React from "react";
import { clearDataContent } from "@/data/services/cleardata";
import { trackEvent } from "@/lib/analytics";
import { AnalyticsEvent } from "@/lib/analytics-events";
import { HeroSection } from "./hero";
import { ConsequencesSection } from "./consequences";
import { SolutionSection } from "./solution";
import { DifferentiationSection } from "./differentiation";
import { ScopeSection } from "./scope";
import { ProcessSection } from "./process";
import { OutcomesSection } from "./outcomes";
import { CommitmentsSection } from "./commitments";
import { PricingSection } from "./pricing";
import { FaqSection } from "./faq";
import { FinalCtaSection } from "./final-cta";
import type { BreadcrumbItemData } from "@/components/site/breadcrumbs";

interface ClearDataPageContentProps {
  breadcrumbItems: BreadcrumbItemData[];
}

export function ClearDataPageContent({ breadcrumbItems }: ClearDataPageContentProps) {
  const [scrollTracked50, setScrollTracked50] = React.useState(false);
  const [scrollTracked90, setScrollTracked90] = React.useState(false);

  // Scroll tracking
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = (scrollTop / scrollHeight) * 100;

      if (scrollPercent >= 50 && !scrollTracked50) {
        trackEvent(AnalyticsEvent.SCROLL_50);
        setScrollTracked50(true);
      }

      if (scrollPercent >= 90 && !scrollTracked90) {
        trackEvent(AnalyticsEvent.SCROLL_90);
        setScrollTracked90(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollTracked50, scrollTracked90]);

  const handleBookCallClick = () => {
    trackEvent(AnalyticsEvent.BOOK_CALL_CLICK);
    // TODO: Implement book call flow
  };

  return (
    <>
      <HeroSection content={clearDataContent.hero} breadcrumbItems={breadcrumbItems} />
      <ConsequencesSection content={clearDataContent.consequences} />
      <SolutionSection content={clearDataContent.solution} />
      <DifferentiationSection content={clearDataContent.differentiation} />
      <ScopeSection content={clearDataContent.scope} />
      <ProcessSection content={clearDataContent.process} />
      <OutcomesSection content={clearDataContent.outcomes} />
      <CommitmentsSection content={clearDataContent.commitments} />
      <PricingSection
        content={clearDataContent.pricing}
        onBookCallClick={handleBookCallClick}
      />
      <FaqSection content={clearDataContent.faq} />
      <FinalCtaSection
        content={clearDataContent.finalCta}
        onBookCallClick={handleBookCallClick}
      />
    </>
  );
}

