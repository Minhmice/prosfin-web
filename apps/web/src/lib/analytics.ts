/**
 * Analytics Event Dispatcher
 * 
 * Lightweight helper để dispatch analytics events.
 * Consent-aware: chỉ push events khi user đã consent.
 * 
 * TODO(Analytics): Replace dataLayer mock with real analytics provider (GA4, Mixpanel, etc.)
 */

const CONSENT_KEY = "prosfin-cookie-consent";

/**
 * Check if user has granted consent
 * 
 * @returns true if consent is granted, false otherwise
 */
function hasConsent(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const consent = localStorage.getItem(CONSENT_KEY);
    return consent === "granted";
  } catch (error) {
    console.warn("Failed to check consent:", error);
    return false;
  }
}

export type AnalyticsEvent =
  | "lead_checklist_submit"
  | "book_call_click"
  | "form_error"
  | "scroll_50"
  | "scroll_90"
  | "services_filter_changed"
  | "services_preset_applied"
  | "service_card_clicked"
  | "compare_opened"
  | "cta_modal_opened";

export interface AnalyticsEventData {
  event: AnalyticsEvent;
  [key: string]: unknown;
}

/**
 * Track analytics event
 * 
 * Consent-aware: chỉ push events khi user đã consent.
 * Nếu denied: chỉ log console (dev) / no-op (prod).
 * 
 * @param event - Event name
 * @param data - Additional event data
 */
export function trackEvent(event: AnalyticsEvent, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const eventData: AnalyticsEventData = {
    event,
    ...data,
  };

  // Check consent
  const consented = hasConsent();

  if (consented) {
    // Push to dataLayer (Google Tag Manager)
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push(eventData);
    }
  }

  // Log to console in development (regardless of consent for debugging)
  if (process.env.NODE_ENV === "development") {
    console.log(
      `[Analytics${consented ? "" : " (no consent)"}]`,
      eventData
    );
  }

  // TODO(Analytics): Add other analytics providers here (GA4, Mixpanel, etc.)
}

/**
 * Track tool event (with consent gating)
 * 
 * @param event - Tool event name
 * @param data - Additional event data
 */
export function trackToolEvent(
  event: AnalyticsEvent,
  data?: Record<string, unknown>
) {
  trackEvent(event, {
    ...data,
    source: "tool",
  });
}

