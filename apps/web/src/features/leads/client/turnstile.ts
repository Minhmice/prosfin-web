/**
 * Turnstile Lifecycle
 * 
 * Token lifecycle & re-render widget utilities.
 * Handles token expiration, refresh, and widget re-rendering.
 */

"use client";

/**
 * Turnstile token state
 */
export interface TurnstileTokenState {
  token: string | null;
  expiresAt: number | null;
  widgetId: string | null;
}

/**
 * Check if Turnstile token is expired
 */
export function isTokenExpired(expiresAt: number | null): boolean {
  if (!expiresAt) return true;
  // Turnstile tokens expire after 5 minutes
  // Add 30 second buffer for network latency
  return Date.now() >= expiresAt - 30000;
}

/**
 * Get Turnstile token expiration time
 * Turnstile tokens are valid for 5 minutes
 */
export function getTokenExpiration(): number {
  return Date.now() + 5 * 60 * 1000; // 5 minutes
}

/**
 * Reset Turnstile widget
 * 
 * @param widgetId - Turnstile widget ID
 */
export function resetTurnstileWidget(widgetId: string | null): void {
  if (typeof window === "undefined" || !widgetId) return;

  // Check if Turnstile is loaded
  if (typeof (window as any).turnstile === "undefined") {
    console.warn("[Turnstile] Turnstile not loaded");
    return;
  }

  try {
    (window as any).turnstile.reset(widgetId);
  } catch (error) {
    console.error("[Turnstile] Error resetting widget:", error);
  }
}

/**
 * Remove Turnstile widget
 * 
 * @param widgetId - Turnstile widget ID
 */
export function removeTurnstileWidget(widgetId: string | null): void {
  if (typeof window === "undefined" || !widgetId) return;

  if (typeof (window as any).turnstile === "undefined") {
    return;
  }

  try {
    (window as any).turnstile.remove(widgetId);
  } catch (error) {
    console.error("[Turnstile] Error removing widget:", error);
  }
}

/**
 * Re-render Turnstile widget
 * 
 * @param containerId - Container element ID
 * @param siteKey - Turnstile site key
 * @param onSuccess - Success callback
 * @param onError - Error callback
 * @returns Widget ID
 */
export function renderTurnstileWidget(
  containerId: string,
  siteKey: string,
  onSuccess: (token: string) => void,
  onError?: () => void
): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  if (typeof (window as any).turnstile === "undefined") {
    console.error("[Turnstile] Turnstile not loaded");
    return null;
  }

  try {
    const widgetId = (window as any).turnstile.render(`#${containerId}`, {
      sitekey: siteKey,
      callback: (token: string) => {
        onSuccess(token);
      },
      "error-callback": () => {
        onError?.();
      },
      "expired-callback": () => {
        // Token expired, reset widget
        resetTurnstileWidget(widgetId);
      },
    });

    return widgetId;
  } catch (error) {
    console.error("[Turnstile] Error rendering widget:", error);
    return null;
  }
}

