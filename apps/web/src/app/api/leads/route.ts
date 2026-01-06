/**
 * Leads API Route
 * 
 * POST /api/leads
 * 
 * Flow: Rate limit → Turnstile verify → Validate → Map → Dedupe → Save → Log
 */

import { NextRequest, NextResponse } from "next/server";
import { checkRequestRateLimit } from "@/lib/security/rate-limit";
import { verifyTurnstileToken } from "@/lib/security/turnstile";
import { extractIp } from "@/lib/security/ip";
import { submitLead } from "@/server/leads/lead.service";
import { LeadNormalizedSchema, type LeadSource } from "@/server/leads/lead.schema";
import { ERROR_CODES, getErrorMessage } from "@/lib/leads/error-codes";
import {
  logLeadSubmitted,
  logLeadRejected,
  logLeadDuplicated,
} from "@/lib/observability/logger";
import { generateRequestId, setTraceContext, clearTraceContext } from "@/lib/observability/tracing";
import { recordLeadSubmitRate, recordErrorCode, recordLatency } from "@/lib/observability/metrics";

/**
 * POST /api/leads
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const ip = extractIp(request);
  const requestId = generateRequestId();

  // Phase 7: Set trace context
  setTraceContext({ requestId });

  try {
    // 1. Rate limiting
    // Extract source from body if available (will be parsed later)
    let source: string | undefined;
    try {
      const bodyPreview = await request.clone().json().catch(() => ({}));
      source = (bodyPreview as any)?.source;
    } catch {
      // Ignore parsing errors, will use default config
    }
    const rateLimitResult = checkRequestRateLimit(request, undefined, source);
    if (!rateLimitResult.allowed) {
      const elapsedMs = Date.now() - startTime;
      recordErrorCode("429", source);
      recordLatency(elapsedMs, source);
      logLeadRejected(
        ERROR_CODES.RATE_LIMITED,
        source,
        ip
      );
      return NextResponse.json(
        {
          ok: false,
          code: ERROR_CODES.RATE_LIMITED,
          message: getErrorMessage(ERROR_CODES.RATE_LIMITED),
          retryAfterSec: rateLimitResult.retryAfterSec,
        },
        { status: 429 }
      );
    }

    // 2. Parse request body
    let body: {
      source: string;
      payload: Record<string, unknown>;
      attribution?: Record<string, unknown>;
      turnstileToken?: string;
    };

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          ok: false,
          code: ERROR_CODES.VALIDATION_ERROR,
          message: "Invalid request body",
        },
        { status: 400 }
      );
    }

    const { source, payload, attribution, turnstileToken } = body;

    // 3. Turnstile verification
    if (process.env.TURNSTILE_SECRET_KEY) {
      const isValid = await verifyTurnstileToken(turnstileToken || "", ip);
      if (!isValid) {
        const elapsedMs = Date.now() - startTime;
        recordErrorCode("403", source);
        recordLatency(elapsedMs, source);
        logLeadRejected(ERROR_CODES.BOT_SUSPECTED, source, ip);
        return NextResponse.json(
          {
            ok: false,
            code: ERROR_CODES.BOT_SUSPECTED,
            message: getErrorMessage(ERROR_CODES.BOT_SUSPECTED),
          },
          { status: 403 }
        );
      }
    }

    // 4. Validate source
    if (!source || typeof source !== "string") {
      return NextResponse.json(
        {
          ok: false,
          code: ERROR_CODES.VALIDATION_ERROR,
          message: "Missing or invalid source",
        },
        { status: 400 }
      );
    }

    // 5. Extract experiments from request headers (set by middleware)
    const experimentsHeader = request.headers.get("x-experiments");
    const experiments: Record<string, string> = {};
    if (experimentsHeader) {
      experimentsHeader.split(",").forEach((pair) => {
        const [key, variant] = pair.split(":");
        if (key && variant) {
          experiments[key.trim()] = variant.trim();
        }
      });
    }

    // Phase 8: Attach experiments to attribution
    const enrichedAttribution = {
      ...(attribution as any),
      experiments: Object.keys(experiments).length > 0 ? experiments : undefined,
    };

    // Phase 7: Update trace context with source
    setTraceContext({ requestId, source });

    const result = await submitLead(
      payload,
      source as LeadSource,
      enrichedAttribution,
      {
        ip,
        ipHash: undefined, // Will be hashed in logger
        userAgent: request.headers.get("user-agent") || undefined,
        pagePath: request.headers.get("referer") || undefined,
      }
    );

    const elapsedMs = Date.now() - startTime;

    // Phase 7: Update trace context with leadId
    setTraceContext({ requestId, leadId: result.lead.id, source });

    // Phase 7: Record metrics
    recordLeadSubmitRate(source, true);
    recordLatency(elapsedMs, source);

    // 6. Log result
    if (result.isDuplicate) {
      logLeadDuplicated(
        result.lead.id,
        result.duplicateOf!,
        source
      );
    } else {
      logLeadSubmitted(
        result.lead.id,
        source,
        result.lead.intent?.serviceSlugs,
        result.lead.attribution?.utm_source,
        ip,
        elapsedMs
      );
    }

    // 7. Return success response
    return NextResponse.json(
      {
        ok: true,
        id: result.lead.id,
        ...(result.isDuplicate && {
          duplicateOf: result.duplicateOf,
          code: ERROR_CODES.DUPLICATE_LEAD,
          message: getErrorMessage(ERROR_CODES.DUPLICATE_LEAD),
        }),
      },
      { status: result.isDuplicate ? 200 : 201 }
    );
  } catch (error) {
    const elapsedMs = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : String(error);

    // Phase 7: Record error metrics
    recordErrorCode("500", undefined);
    recordLatency(elapsedMs, undefined);
    recordLeadSubmitRate(undefined || "unknown", false);

    logLeadRejected(ERROR_CODES.INTERNAL_ERROR, undefined, ip, errorMessage);

    return NextResponse.json(
      {
        ok: false,
        code: ERROR_CODES.INTERNAL_ERROR,
        message: getErrorMessage(ERROR_CODES.INTERNAL_ERROR),
      },
      { status: 500 }
    );
  } finally {
    // Phase 7: Clear trace context
    clearTraceContext();
  }
}

