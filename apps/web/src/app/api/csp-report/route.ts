/**
 * CSP Report Endpoint
 * 
 * Receives and logs CSP violation reports.
 * Used during CSP Report-Only phase to monitor violations.
 */

import { NextRequest, NextResponse } from "next/server";
import { logCspViolation } from "@/lib/observability/logger";

/**
 * POST /api/csp-report
 * 
 * Receives CSP violation reports from browser.
 * Body format: { "csp-report": { ... } }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const cspReport = body["csp-report"] || body;

    // Log CSP violation
    logCspViolation({
      documentUri: cspReport["document-uri"],
      violatedDirective: cspReport["violated-directive"],
      effectiveDirective: cspReport["effective-directive"],
      originalPolicy: cspReport["original-policy"],
      blockedUri: cspReport["blocked-uri"],
      sourceFile: cspReport["source-file"],
      lineNumber: cspReport["line-number"],
      columnNumber: cspReport["column-number"],
      statusCode: cspReport["status-code"],
      referrer: cspReport.referrer,
      userAgent: request.headers.get("user-agent") || undefined,
      timestamp: new Date().toISOString(),
    });

    // Return 204 No Content (CSP spec)
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    // Log error but don't fail (CSP reporting should not break the app)
    console.error("[CSP Report] Error processing report:", error);
    return new NextResponse(null, { status: 204 });
  }
}

