/**
 * Analytics Adapter Interface
 * 
 * Adapter pattern để dễ dàng swap vendor (Google Analytics, Mixpanel, etc.)
 */

export interface AnalyticsAdapter {
  track(event: string, properties?: Record<string, unknown>): void
  identify(userId: string, traits?: Record<string, unknown>): void
  page(name: string, properties?: Record<string, unknown>): void
}

