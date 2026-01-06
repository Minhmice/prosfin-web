/**
 * Rate Limiter
 * 
 * Memory-based rate limiter (MVP).
 * Interface upgradable to Redis/Upstash.
 */

import { extractIp } from "./ip";

/**
 * Rate limit entry
 */
interface RateLimitEntry {
  count: number;
  resetAt: number;
  burstCount: number;
  burstResetAt: number;
}

/**
 * In-memory store (MVP)
 * In production, use Redis or similar
 */
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now && entry.burstResetAt < now) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Rate limit configuration
 */
export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
  burstWindowMs?: number; // Burst window (optional)
  burstMaxRequests?: number; // Max requests per burst window
}

/**
 * Rate limit policy by source
 */
export type LeadSource = "oneledger" | "cleardata" | "contact" | "default";

export const RATE_LIMIT_POLICIES: Record<LeadSource, RateLimitConfig> = {
  oneledger: {
    windowMs: 10 * 60 * 1000, // 10 minutes (sustained)
    maxRequests: 10,
    burstWindowMs: 30 * 1000, // 30 seconds (burst)
    burstMaxRequests: 3,
  },
  cleardata: {
    windowMs: 10 * 60 * 1000, // 10 minutes
    maxRequests: 10,
    burstWindowMs: 30 * 1000, // 30 seconds
    burstMaxRequests: 3,
  },
  contact: {
    windowMs: 15 * 60 * 1000, // 15 minutes (more lenient for contact forms)
    maxRequests: 15,
    burstWindowMs: 60 * 1000, // 1 minute
    burstMaxRequests: 5,
  },
  default: {
    windowMs: 10 * 60 * 1000, // 10 minutes
    maxRequests: 10,
    burstWindowMs: 30 * 1000, // 30 seconds
    burstMaxRequests: 3,
  },
};

/**
 * Default rate limit config for /api/leads
 */
export const DEFAULT_LEAD_RATE_LIMIT: RateLimitConfig = RATE_LIMIT_POLICIES.default;

/**
 * Check rate limit
 * 
 * @returns { allowed: boolean, retryAfterSec?: number }
 */
export function checkRateLimit(
  key: string,
  config: RateLimitConfig = DEFAULT_LEAD_RATE_LIMIT
): { allowed: boolean; retryAfterSec?: number } {
  const now = Date.now();
  let entry = rateLimitStore.get(key);

  if (!entry) {
    entry = {
      count: 0,
      resetAt: now + config.windowMs,
      burstCount: 0,
      burstResetAt: now + (config.burstWindowMs || config.windowMs),
    };
    rateLimitStore.set(key, entry);
  }

  // Check burst limit first
  if (config.burstWindowMs && config.burstMaxRequests) {
    if (now > entry.burstResetAt) {
      entry.burstCount = 0;
      entry.burstResetAt = now + config.burstWindowMs;
    }

    if (entry.burstCount >= config.burstMaxRequests) {
      const retryAfter = Math.ceil((entry.burstResetAt - now) / 1000);
      return {
        allowed: false,
        retryAfterSec: retryAfter,
      };
    }

    entry.burstCount++;
  }

  // Check main window limit
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + config.windowMs;
  }

  if (entry.count >= config.maxRequests) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return {
      allowed: false,
      retryAfterSec: retryAfter,
    };
  }

  entry.count++;
  return { allowed: true };
}

/**
 * Get rate limit config by source
 */
export function getRateLimitConfigBySource(source?: string): RateLimitConfig {
  if (!source) return RATE_LIMIT_POLICIES.default;

  // Map source string to policy
  if (source === "oneledger") return RATE_LIMIT_POLICIES.oneledger;
  if (source === "cleardata") return RATE_LIMIT_POLICIES.cleardata;
  if (source === "contact" || source === "contact_page" || source === "contact_lite") {
    return RATE_LIMIT_POLICIES.contact;
  }

  return RATE_LIMIT_POLICIES.default;
}

/**
 * Check rate limit for request
 */
export function checkRequestRateLimit(
  request: Request,
  config?: RateLimitConfig,
  source?: string
): { allowed: boolean; retryAfterSec?: number } {
  const ip = extractIp(request);
  
  // Use source-specific config if provided
  const effectiveConfig = config || getRateLimitConfigBySource(source);
  
  // Create key with IP and source for per-source rate limiting
  const sourceKey = source || "default";
  const key = `rate_limit:${sourceKey}:${ip}`;
  
  return checkRateLimit(key, effectiveConfig);
}

