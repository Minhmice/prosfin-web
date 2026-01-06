/**
 * Leads API Client
 * 
 * Client-side wrapper for /api/leads endpoint.
 * Handles POST requests with error normalization.
 */

import { getErrorMessage } from "@/lib/leads/error-codes";
import { track } from "@/lib/analytics/events";

export type LeadsApiRequest = {
  source: string;
  payload: Record<string, unknown>;
  attribution?: Record<string, unknown>;
  turnstileToken?: string;
};

export type LeadsApiResponse =
  | { ok: true; id: string; duplicateOf?: string }
  | { ok: false; code?: string; message?: string; retryAfterSec?: number };

/**
 * Generate client request ID for idempotency
 */
function generateClientRequestId(): string {
  // Use crypto.randomUUID if available, fallback to timestamp + random
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * POST lead to /api/leads
 */
export async function postLead(req: LeadsApiRequest): Promise<LeadsApiResponse> {
  // Phase 7: Add clientRequestId for idempotency
  const clientRequestId = generateClientRequestId();
  const payloadWithIdempotency = {
    ...req.payload,
    extras: {
      ...(req.payload.extras as Record<string, unknown> || {}),
      clientRequestId,
    },
  };

  // Phase 5: Track lead submission attempt
  track("lead_submit_attempted", {
    source: req.source,
    sourceDetail: (req.payload as any)?.intent?.sourceDetail || (req.payload as any)?.sourceDetail || "unknown",
    hasTurnstile: !!req.turnstileToken,
  });

  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...req,
        payload: payloadWithIdempotency,
      }),
    });

    const json = (await res.json().catch(() => null)) as any;

    // Route returns ok/code/message format
    if (!res.ok) {
      const code = json?.code || "INTERNAL_ERROR";
      // Phase 5: Track failed submission
      track("lead_submit_failed", {
        code,
        httpStatus: res.status,
        source: req.source,
      });
      return {
        ok: false,
        code,
        message: json?.message || getErrorMessage(code),
        retryAfterSec: json?.retryAfterSec,
      };
    }

    if (json?.ok) {
      // Phase 5: Track successful submission
      track("lead_submit_succeeded", {
        id: json.id,
        ...(json.duplicateOf && { duplicateOf: json.duplicateOf }),
        source: req.source,
      });
      return {
        ok: true,
        id: json.id,
        ...(json.duplicateOf && { duplicateOf: json.duplicateOf }),
      };
    }

    // Phase 5: Track failed submission (unexpected response)
    track("lead_submit_failed", {
      code: json?.code || "UNKNOWN_ERROR",
      httpStatus: res.status,
      source: req.source,
    });
    return {
      ok: false,
      code: json?.code,
      message: json?.message || getErrorMessage("INTERNAL_ERROR"),
    };
  } catch (error) {
    // Phase 5: Track failed submission (network error)
    track("lead_submit_failed", {
      code: "INTERNAL_ERROR",
      httpStatus: 0,
      source: req.source,
    });
    return {
      ok: false,
      code: "INTERNAL_ERROR",
      message: error instanceof Error ? error.message : "Có lỗi xảy ra khi gửi yêu cầu.",
    };
  }
}

