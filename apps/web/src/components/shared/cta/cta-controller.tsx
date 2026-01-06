/**
 * CTA Controller
 * 
 * Centralized CTA handling with analytics tracking.
 */

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useHeroModal } from "@/components/landing/hero/hero-modal-context";
import { trackEvent } from "@/lib/analytics";
import { AnalyticsEvent } from "@/lib/analytics-events";

export type CtaType = "primary" | "secondary" | "tertiary";

export interface CtaConfig {
  type: CtaType;
  label: string;
  href?: string;
  onClick?: () => void;
  analyticsData?: Record<string, unknown>;
}

/**
 * useCtaController - Hook to centralize CTA logic
 * 
 * Handles:
 * - primary: open hero modal
 * - secondary: navigate to /services
 * - tertiary: open contact-lite (navigate to /contact)
 */
export function useCtaController() {
  const router = useRouter();
  const { openModal } = useHeroModal();

  const handleCta = React.useCallback(
    (config: CtaConfig) => {
      // Track analytics
      const eventMap: Record<CtaType, AnalyticsEvent> = {
        primary: AnalyticsEvent.CTA_MODAL_OPENED,
        secondary: AnalyticsEvent.SERVICES_FILTER_CHANGED,
        tertiary: AnalyticsEvent.CTA_MODAL_OPENED,
      };

      trackEvent(eventMap[config.type], {
        cta_label: config.label,
        cta_type: config.type,
        ...config.analyticsData,
      });

      // Handle action based on type
      if (config.onClick) {
        config.onClick();
        return;
      }

      switch (config.type) {
        case "primary":
          openModal();
          break;
        case "secondary":
          if (config.href) {
            router.push(config.href);
          } else {
            router.push("/services");
          }
          break;
        case "tertiary":
          if (config.href) {
            router.push(config.href);
          } else {
            router.push("/contact");
          }
          break;
      }
    },
    [router, openModal]
  );

  return {
    handleCta,
  };
}

