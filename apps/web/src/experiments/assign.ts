/**
 * Experiment Assignment
 * 
 * Cookie-based variant assignment with sticky behavior.
 * Ensures same user sees same variant across sessions.
 */

import type { NextRequest } from "next/server";
import type { ExperimentKey, VariantKey, ExperimentAssignment } from "./experiments.types";
import { getExperiment, isExperimentActive } from "./experiments.registry";

const COOKIE_PREFIX = "exp_";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/**
 * Get cookie name for experiment
 */
function getCookieName(experimentKey: ExperimentKey): string {
  return `${COOKIE_PREFIX}${experimentKey}`;
}

/**
 * Parse assignment from cookie value
 */
function parseAssignment(cookieValue: string): ExperimentAssignment | null {
  try {
    const parsed = JSON.parse(cookieValue);
    if (parsed.experimentKey && parsed.variant && parsed.assignedAt) {
      return parsed as ExperimentAssignment;
    }
  } catch {
    // Invalid JSON, try simple format: "v1" or "v2"
    if (cookieValue.match(/^v[1-3]$/)) {
      return {
        experimentKey: "oneledger_hero_value_prop", // fallback, should be determined from context
        variant: cookieValue as VariantKey,
        assignedAt: new Date().toISOString(),
      };
    }
  }
  return null;
}

/**
 * Assign variant using consistent hashing
 */
function assignVariant(experimentKey: ExperimentKey, userId: string): VariantKey {
  const experiment = getExperiment(experimentKey);
  if (!experiment || !isExperimentActive(experimentKey)) {
    return "control";
  }

  // Simple hash-based assignment for consistency
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    const char = userId.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  const index = Math.abs(hash) % experiment.variants.length;
  return experiment.variants[index] || "control";
}

/**
 * Get or create assignment for experiment
 * 
 * @param request - Next.js request object
 * @param experimentKey - Experiment key
 * @param userId - User identifier (IP hash, session ID, etc.)
 * @returns Variant assignment
 */
export function getOrCreateAssignment(
  request: NextRequest,
  experimentKey: ExperimentKey,
  userId: string
): VariantKey {
  const cookieName = getCookieName(experimentKey);
  const cookieValue = request.cookies.get(cookieName)?.value;

  // Check if already assigned
  if (cookieValue) {
    const assignment = parseAssignment(cookieValue);
    if (assignment && assignment.variant) {
      return assignment.variant;
    }
  }

  // Create new assignment
  const variant = assignVariant(experimentKey, userId);
  return variant;
}

/**
 * Create assignment cookie value
 */
export function createAssignmentCookie(
  experimentKey: ExperimentKey,
  variant: VariantKey
): string {
  const assignment: ExperimentAssignment = {
    experimentKey,
    variant,
    assignedAt: new Date().toISOString(),
  };
  return JSON.stringify(assignment);
}

/**
 * Get assignment cookie name
 */
export function getAssignmentCookieName(experimentKey: ExperimentKey): string {
  return getCookieName(experimentKey);
}

/**
 * Get all assignments from request cookies
 */
export function getAllAssignments(request: NextRequest): Map<ExperimentKey, VariantKey> {
  const assignments = new Map<ExperimentKey, VariantKey>();

  request.cookies.getAll().forEach((cookie) => {
    if (cookie.name.startsWith(COOKIE_PREFIX)) {
      const experimentKey = cookie.name.replace(COOKIE_PREFIX, "") as ExperimentKey;
      const assignment = parseAssignment(cookie.value);
      if (assignment && assignment.variant) {
        assignments.set(experimentKey, assignment.variant);
      }
    }
  });

  return assignments;
}

