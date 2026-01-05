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
 * Default rate limit config for /api/leads
 */
export const DEFAULT_LEAD_RATE_LIMIT: RateLimitConfig = {
  windowMs: 10 * 60 * 1000, // 10 minutes
  maxRequests: 10,
  burstWindowMs: 30 * 1000, // 30 seconds
  burstMaxRequests: 3,
};

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
 * Check rate limit for request
 */
export function checkRequestRateLimit(
  request: Request,
  config?: RateLimitConfig
): { allowed: boolean; retryAfterSec?: number } {
  const ip = extractIp(request);
  const key = `rate_limit:${ip}`;
  return checkRateLimit(key, config);
}

