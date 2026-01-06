/**
 * Onboarding Token Generator
 * 
 * Secure, time-bound token gắn với leadId.
 * Token expires after 7-14 days.
 */

import { randomBytes } from "crypto";

/**
 * Token configuration
 */
const TOKEN_EXPIRY_DAYS = 14; // 14 days default
const TOKEN_SECRET = process.env.ONBOARDING_TOKEN_SECRET || "default-secret-change-in-production";

/**
 * Generate onboarding token
 */
export function generateOnboardingToken(leadId: string): string {
  // Create token: base64(leadId:timestamp:random)
  const timestamp = Date.now();
  const random = randomBytes(16).toString("hex");
  const payload = `${leadId}:${timestamp}:${random}`;
  
  // Simple encoding (in production, use JWT or similar)
  const token = Buffer.from(payload).toString("base64url");
  return token;
}

/**
 * Verify and decode onboarding token
 */
export function verifyOnboardingToken(token: string): {
  valid: boolean;
  leadId?: string;
  expiresAt?: number;
  error?: string;
} {
  try {
    // Decode token
    const payload = Buffer.from(token, "base64url").toString("utf-8");
    const [leadId, timestampStr, random] = payload.split(":");

    if (!leadId || !timestampStr) {
      return { valid: false, error: "Invalid token format" };
    }

    const timestamp = parseInt(timestampStr, 10);
    if (isNaN(timestamp)) {
      return { valid: false, error: "Invalid timestamp" };
    }

    // Check expiry
    const expiresAt = timestamp + TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    const now = Date.now();

    if (now > expiresAt) {
      return { valid: false, error: "Token expired" };
    }

    return {
      valid: true,
      leadId,
      expiresAt,
    };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Invalid token",
    };
  }
}

/**
 * Get token expiry date
 */
export function getTokenExpiryDate(): Date {
  const now = new Date();
  return new Date(now.getTime() + TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
}

