/**
 * Analytics Events Wrapper
 * 
 * Backend agnostic event tracking for OneLedger and lead submission flows.
 * Can be swapped for GA4/PostHog/Segment later.
 */

export type AnalyticsEvent =
  | "oneledger_scan_completed"
  | "oneledger_module_opened"
  | "oneledger_jump_to_module"
  | "lead_submit_attempted"
  | "lead_submit_succeeded"
  | "lead_submit_failed";

export type AnalyticsProps = Record<string, unknown>;

/**
 * Track analytics event
 * 
 * @param eventName - Event name from AnalyticsEvent type
 * @param props - Event properties
 */
export function track(eventName: AnalyticsEvent, props?: AnalyticsProps): void {
  if (typeof window === "undefined") return;

  // Console log for development (can be replaced with actual analytics SDK)
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", eventName, props);
  }

  // TODO: Integrate with analytics provider (GA4/PostHog/Segment)
  // Example:
  // if (window.gtag) {
  //   window.gtag("event", eventName, props);
  // }
  // Or:
  // if (window.posthog) {
  //   window.posthog.capture(eventName, props);
  // }
}

