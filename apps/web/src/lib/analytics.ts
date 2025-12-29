/**
 * Analytics Event Dispatcher
 * 
 * Lightweight helper để dispatch analytics events.
 * Hiện tại push vào window.dataLayer nếu có, hoặc console.log trong dev.
 * 
 * TODO(Analytics): Replace dataLayer mock with real analytics provider (GA4, Mixpanel, etc.)
 */

export type AnalyticsEvent =
  | "lead_checklist_submit"
  | "book_call_click"
  | "form_error"
  | "scroll_50"
  | "scroll_90";

export interface AnalyticsEventData {
  event: AnalyticsEvent;
  [key: string]: unknown;
}

/**
 * Track analytics event
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

  // Try to push to dataLayer (Google Tag Manager)
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push(eventData);
  }

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", eventData);
  }

  // TODO(Analytics): Add other analytics providers here (GA4, Mixpanel, etc.)
}

