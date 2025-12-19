/**
 * Stringify Query Utility
 * Convert typed object to URLSearchParams (only include non-default values)
 */

/**
 * Default values for query parameters
 */
export interface QueryDefaults {
  page?: number
  pageSize?: number
  sort?: string
  [key: string]: unknown
}

/**
 * Convert typed query object to URLSearchParams
 * Only includes non-default values
 */
export function stringifyQuery(
  query: Record<string, unknown>,
  defaults: QueryDefaults = { page: 1, pageSize: 20, sort: undefined }
): URLSearchParams {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(query)) {
    // Skip undefined/null/empty string
    if (value === undefined || value === null || value === "") {
      continue
    }

    // Handle arrays (e.g., tags)
    if (Array.isArray(value)) {
      if (value.length > 0) {
        value.forEach((item) => params.append(key, String(item)))
      }
      continue
    }

    // Handle numbers - compare with defaults
    if (typeof value === "number") {
      const defaultValue = defaults[key]
      if (defaultValue !== undefined && value === defaultValue) {
        continue
      }
      // Special handling for page: only include if > 1
      if (key === "page" && value <= 1) {
        continue
      }
      params.set(key, value.toString())
      continue
    }

    // Handle strings - compare with defaults
    if (typeof value === "string") {
      const defaultValue = defaults[key]
      if (defaultValue !== undefined && value === defaultValue) {
        continue
      }
      params.set(key, value)
      continue
    }

    // For other types, convert to string
    params.set(key, String(value))
  }

  return params
}

