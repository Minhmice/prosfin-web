/**
 * Client-Side Feature Flags
 * 
 * Feature flags for component-level experiments.
 * Reads from cookies set by middleware.
 */

import type { ExperimentKey, VariantKey } from "./experiments.types";
import { isExperimentActive } from "./experiments.registry";

const COOKIE_PREFIX = "exp_";

/**
 * Get cookie name for experiment
 */
function getCookieName(experimentKey: ExperimentKey): string {
  return `${COOKIE_PREFIX}${experimentKey}`;
}

/**
 * Get variant from cookie (client-side)
 */
export function getVariant(experimentKey: ExperimentKey): VariantKey | null {
  if (typeof document === "undefined") return null;

  // Check if experiment is active
  if (!isExperimentActive(experimentKey)) {
    return null;
  }

  const cookieName = getCookieName(experimentKey);
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === cookieName && value) {
      try {
        const parsed = JSON.parse(decodeURIComponent(value));
        if (parsed.variant && typeof parsed.variant === "string") {
          return parsed.variant as VariantKey;
        }
        // Fallback: try simple format
        if (value.match(/^v[1-3]$/)) {
          return value as VariantKey;
        }
      } catch {
        // Invalid JSON, try simple format
        if (value.match(/^v[1-3]$/)) {
          return value as VariantKey;
        }
      }
    }
  }

  return null;
}

/**
 * Get all variants from cookies (client-side)
 */
export function getAllVariants(): Map<ExperimentKey, VariantKey> {
  const variants = new Map<ExperimentKey, VariantKey>();

  if (typeof document === "undefined") return variants;

  const cookies = document.cookie.split(";");
  cookies.forEach((cookie) => {
    const [name, value] = cookie.trim().split("=");
    if (name.startsWith(COOKIE_PREFIX) && value) {
      const experimentKey = name.replace(COOKIE_PREFIX, "") as ExperimentKey;
      const variant = getVariant(experimentKey);
      if (variant) {
        variants.set(experimentKey, variant);
      }
    }
  });

  return variants;
}

/**
 * Check if variant is active
 */
export function isVariantActive(experimentKey: ExperimentKey, variant: VariantKey): boolean {
  const currentVariant = getVariant(experimentKey);
  return currentVariant === variant;
}

/**
 * Get experiment context for analytics
 */
export function getExperimentContext(): Record<string, string> {
  const variants = getAllVariants();
  const context: Record<string, string> = {};

  variants.forEach((variant, experimentKey) => {
    context[experimentKey] = variant;
  });

  return context;
}

