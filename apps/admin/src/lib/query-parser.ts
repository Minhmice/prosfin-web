/**
 * Query Parser
 * Parse and validate query parameters
 */

import { z } from "zod"

export interface ParsedQuery {
  page: number
  pageSize: number
  q?: string
  sort?: {
    field: string
    direction: "asc" | "desc"
  }
  filters: Record<string, string | string[]>
}

/**
 * Parse sort string (format: "field" or "-field")
 */
function parseSort(sort?: string): ParsedQuery["sort"] {
  if (!sort) return undefined

  const direction = sort.startsWith("-") ? "desc" : "asc"
  const field = sort.startsWith("-") ? sort.slice(1) : sort

  return { field, direction }
}

/**
 * Parse query parameters from URLSearchParams
 */
export function parseQuery(searchParams: URLSearchParams): ParsedQuery {
  const page = Number(searchParams.get("page")) || 1
  const pageSize = Number(searchParams.get("pageSize")) || 20
  const q = searchParams.get("q") || undefined
  const sort = parseSort(searchParams.get("sort") || undefined)

  // Extract filters (all params except page, pageSize, q, sort)
  const filters: Record<string, string | string[]> = {}
  const excludeKeys = ["page", "pageSize", "q", "sort"]

  for (const [key, value] of searchParams.entries()) {
    if (!excludeKeys.includes(key)) {
      // Handle multiple values for same key
      const existing = filters[key]
      if (existing) {
        filters[key] = Array.isArray(existing)
          ? [...existing, value]
          : [existing, value]
      } else {
        filters[key] = value
      }
    }
  }

  return {
    page: Math.max(1, page),
    pageSize: Math.min(100, Math.max(1, pageSize)),
    q,
    sort,
    filters,
  }
}

