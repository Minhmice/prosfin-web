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

/**
 * POST /api/leads
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const ip = extractIp(request);

  try {
    // 1. Rate limiting
    const rateLimitResult = checkRequestRateLimit(request);
    if (!rateLimitResult.allowed) {
      logLeadRejected(
        ERROR_CODES.RATE_LIMITED,
        undefined,
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

    // 5. Submit lead
    const result = await submitLead(
      payload,
      source as LeadSource,
      attribution as any,
      {
        ip,
        ipHash: undefined, // Will be hashed in logger
        userAgent: request.headers.get("user-agent") || undefined,
        pagePath: request.headers.get("referer") || undefined,
      }
    );

    const elapsedMs = Date.now() - startTime;

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

    logLeadRejected(ERROR_CODES.INTERNAL_ERROR, undefined, ip, errorMessage);

    return NextResponse.json(
      {
        ok: false,
        code: ERROR_CODES.INTERNAL_ERROR,
        message: getErrorMessage(ERROR_CODES.INTERNAL_ERROR),
      },
      { status: 500 }
    );
  }
}

