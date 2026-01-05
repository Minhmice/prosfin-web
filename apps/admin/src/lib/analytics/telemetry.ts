"use client"

import { ConsoleAdapter } from "./console-adapter"
import type { AnalyticsAdapter } from "./adapter"

/**
 * Telemetry / Analytics
 * 
 * Event tracking adapter sẵn sàng swap vendor
 */

// Get adapter based on environment
function getAdapter(): AnalyticsAdapter {
  // In development, use console adapter
  if (process.env.NODE_ENV === "development") {
    return new ConsoleAdapter()
  }

  // In production, can swap to real vendor
  // Example: return new GoogleAnalyticsAdapter()
  // Example: return new MixpanelAdapter()

  // For now, use console adapter
  return new ConsoleAdapter()
}

const adapter = getAdapter()

/**
 * Track event
 */
export function track(event: string, properties?: Record<string, unknown>): void {
  adapter.track(event, properties)
}

/**
 * Identify user
 */
export function identify(userId: string, traits?: Record<string, unknown>): void {
  adapter.identify(userId, traits)
}

/**
 * Track page view
 */
export function page(name: string, properties?: Record<string, unknown>): void {
  adapter.page(name, properties)
}

/**
 * Common event names
 */
export const Events = {
  // Lead events
  LEAD_CREATE: "lead_create",
  LEAD_UPDATE: "lead_update",
  LEAD_CONVERT: "lead_convert",
  LEAD_DELETE: "lead_delete",

  // Client events
  CLIENT_OPEN: "client_open",
  CLIENT_UPDATE: "client_update",
  CLIENT_DELETE: "client_delete",

  // Post events
  POST_CREATE: "post_create",
  POST_PUBLISH: "post_publish",
  POST_UPDATE: "post_update",

  // Schedule events
  SCHEDULE_CREATE: "schedule_create",
  SCHEDULE_UPDATE: "schedule_update",

  // Task events
  TASK_CREATE: "task_create",
  TASK_COMPLETE: "task_complete",

  // Search events
  SEARCH_PERFORMED: "search_performed",

  // UI events
  COMMAND_PALETTE_OPENED: "command_palette_opened",
} as const

