/**
 * Parse Query Utility
 * Parse URLSearchParams into typed object using Zod schema
 */

import type { z } from "zod"

/**
 * Parse URLSearchParams into typed object with schema validation
 * Normalizes defaults (page=1, pageSize=20, sort=undefined)
 */
export function parseQuery<T extends z.ZodTypeAny>(
  searchParams: URLSearchParams,
  schema: T
): z.infer<T> {
  const params = Object.fromEntries(searchParams.entries())
  const parsed = schema.parse(params)
  
  // Normalize array fields to ensure stable reference
  if (parsed && typeof parsed === "object") {
    // Handle tags array normalization (sort for stable reference)
    if ("tags" in parsed && Array.isArray(parsed.tags)) {
      parsed.tags = [...parsed.tags].sort()
    }
  }
  
  return parsed
}

