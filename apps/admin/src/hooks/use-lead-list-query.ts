/**
 * Lead List Query Hook
 * Sync URL state with table filters/sort/pagination
 */

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback, useMemo } from "react"
import { leadListQuerySchema } from "@/features/crm/schemas"
import { useDebouncedCallback } from "use-debounce"
import { parseQuery, stringifyQuery } from "@/features/crm/shared/query"

export interface LeadListQuery {
  q?: string
  status?: "new" | "contacted" | "qualified" | "converted" | "archived"
  source?: "website" | "referral" | "social" | "other"
  owner?: string
  page: number
  pageSize: number
  sort?: string
}

export function useLeadListQuery() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Parse query from URL - use stable string representation for comparison
  const queryString = useMemo(() => {
    return searchParams.toString()
  }, [searchParams])
  
  // Parse query from URL using shared utility
  const query = useMemo(() => {
    const parsed = parseQuery(searchParams, leadListQuerySchema)
    return parsed
  }, [queryString, searchParams])

  // Update query in URL using shared utility
  const updateQuery = useCallback(
    (updates: Partial<LeadListQuery>) => {
      const newQuery = { ...query, ...updates }
      
      // Check if query actually changed by comparing stringified versions
      const currentParams = stringifyQuery(query, { page: 1, pageSize: 20, sort: undefined })
      const newParams = stringifyQuery(newQuery, { page: 1, pageSize: 20, sort: undefined })
      const currentQueryString = currentParams.toString()
      const newQueryString = newParams.toString()
      
      // Only update URL if query actually changed
      if (currentQueryString !== newQueryString) {
        router.replace(`${pathname}${newQueryString ? `?${newQueryString}` : ""}`, { scroll: false })
      }
    },
    [query, router, pathname]
  )

  // Debounced search update
  const updateSearch = useDebouncedCallback(
    (q: string) => {
      updateQuery({ q: q || undefined, page: 1 })
    },
    300
  )

  // Reset all filters
  const resetFilters = useCallback(() => {
    router.replace(pathname, { scroll: false })
  }, [router, pathname])

  return {
    query,
    updateQuery,
    updateSearch,
    resetFilters,
  }
}

