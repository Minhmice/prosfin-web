import type { AnalyticsAdapter } from "./adapter"

/**
 * Console Adapter - Logs events to console (dev mode)
 */
export class ConsoleAdapter implements AnalyticsAdapter {
  track(event: string, properties?: Record<string, unknown>): void {
    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics]", event, properties || {})
    }
  }

  identify(userId: string, traits?: Record<string, unknown>): void {
    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics] Identify", userId, traits || {})
    }
  }

  page(name: string, properties?: Record<string, unknown>): void {
    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics] Page", name, properties || {})
    }
  }
}

