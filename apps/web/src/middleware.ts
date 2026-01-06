/**
 * Next.js Middleware
 * 
 * Edge-level routing for experiment assignment.
 * Assigns variants for /services/oneledger page.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getOrCreateAssignment,
  createAssignmentCookie,
  getAssignmentCookieName,
  getAllAssignments,
} from "./experiments/assign";
import { getActiveExperiments } from "./experiments/experiments.registry";
import { extractIp, hashIp } from "./lib/security/ip";
import { applySecurityHeaders } from "./lib/security/headers";
import { getCSPHeaderPair } from "./lib/security/csp";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Apply security headers to all routes
  const response = NextResponse.next();
  applySecurityHeaders(response.headers);

  // Apply CSP header (Report-Only mode initially)
  const cspHeader = getCSPHeaderPair(true); // true = report-only
  response.headers.set(cspHeader.name, cspHeader.value);

  // Only apply experiments to /services/oneledger
  if (pathname !== "/services/oneledger") {
    return response;
  }
  const ip = extractIp(request);
  const userId = hashIp(ip); // Use IP hash as user identifier

  // Get active experiments
  const activeExperiments = getActiveExperiments();

  // Assign variants for each active experiment
  activeExperiments.forEach((experiment) => {
    const cookieName = getAssignmentCookieName(experiment.key);
    const existingCookie = request.cookies.get(cookieName);

    // If cookie exists, keep it (sticky assignment)
    if (existingCookie) {
      return;
    }

    // Create new assignment
    const variant = getOrCreateAssignment(request, experiment.key, userId);
    const cookieValue = createAssignmentCookie(experiment.key, variant);

    // Set cookie with 30 days expiration
    response.cookies.set(cookieName, cookieValue, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: false, // Allow client-side access for analytics
      sameSite: "lax",
      path: "/",
    });
  });

  // Add experiment context to response headers for server components
  const assignments = getAllAssignments(request);
  if (assignments.size > 0) {
    const experimentsHeader = Array.from(assignments.entries())
      .map(([key, variant]) => `${key}:${variant}`)
      .join(",");
    response.headers.set("x-experiments", experimentsHeader);
  }

  return response;
}

export const config = {
  matcher: "/services/oneledger",
};

