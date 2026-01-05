/**
 * Tool URL State Management
 * 
 * Parse and build URL parameters for tool inputs.
 * Supports anonymization for sensitive data.
 */

import type { ToolInput } from "@/types/tools";

/**
 * Parse tool inputs from URL search params
 */
export function parseToolParams(searchParams: URLSearchParams): ToolInput {
  const input: ToolInput = {};

  for (const [key, value] of searchParams.entries()) {
    // Skip non-input params
    if (key === "anonymize" || key === "share") continue;

    // Try to parse as number
    const numValue = Number(value);
    if (!isNaN(numValue) && value !== "") {
      input[key] = numValue;
    } else if (value === "true") {
      input[key] = true;
    } else if (value === "false") {
      input[key] = false;
    } else {
      input[key] = value;
    }
  }

  return input;
}

/**
 * Build URL search params from tool inputs
 * 
 * @param inputs - Tool inputs
 * @param anonymize - If true, convert absolute values to index-based ranges
 */
export function buildToolParams(
  inputs: ToolInput,
  anonymize: boolean = false
): URLSearchParams {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(inputs)) {
    if (value === undefined || value === null) continue;

    if (anonymize && typeof value === "number" && value > 0) {
      // Convert to index-based range
      // Example: 100M -> "range_3" (if 100M falls in range 3)
      const range = getValueRange(value);
      params.set(key, range);
    } else {
      params.set(key, String(value));
    }
  }

  if (anonymize) {
    params.set("anonymize", "true");
  }

  return params;
}

/**
 * Get value range index for anonymization
 * 
 * Ranges:
 * - 0: < 10M
 * - 1: 10M - 50M
 * - 2: 50M - 100M
 * - 3: 100M - 500M
 * - 4: 500M - 1B
 * - 5: > 1B
 */
function getValueRange(value: number): string {
  if (value < 10_000_000) return "range_0";
  if (value < 50_000_000) return "range_1";
  if (value < 100_000_000) return "range_2";
  if (value < 500_000_000) return "range_3";
  if (value < 1_000_000_000) return "range_4";
  return "range_5";
}

/**
 * Get shareable URL for tool with inputs
 */
export function getToolShareUrl(
  slug: string,
  inputs: ToolInput,
  anonymize: boolean = false
): string {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn";
  const params = buildToolParams(inputs, anonymize);
  return `${baseUrl}/tools/${slug}?${params.toString()}`;
}

