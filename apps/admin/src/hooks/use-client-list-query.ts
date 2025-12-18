/**
 * Client List Query Hook
 * Sync URL state with table filters/sort/pagination
 */

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback, useMemo } from "react"
import { clientListQuerySchema } from "@/features/crm/schemas"
import { useDebouncedCallback } from "use-debounce"

export interface ClientListQuery {
  q?: string
  status?: "active" | "inactive" | "archived"
  owner?: string
  tags?: string[]
  page: number
  pageSize: number
  sort?: string
}

export function useClientListQuery() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Parse query from URL - use stable string representation for comparison
  const queryString = useMemo(() => {
    return searchParams.toString()
  }, [searchParams])
  
  // Parse query from URL
  const query = useMemo(() => {
    const params = Object.fromEntries(searchParams.entries())
    const parsed = clientListQuerySchema.parse(params)
    // Normalize tags array to ensure stable reference
    if (parsed.tags && Array.isArray(parsed.tags)) {
      parsed.tags = [...parsed.tags].sort()
    }
    return parsed
  }, [queryString])

  // Update query in URL
  const updateQuery = useCallback(
    (updates: Partial<ClientListQuery>) => {
      const newQuery = { ...query, ...updates }
      const params = new URLSearchParams()

      // Only add non-default values
      if (newQuery.q) params.set("q", newQuery.q)
      if (newQuery.status) params.set("status", newQuery.status)
      if (newQuery.owner) params.set("owner", newQuery.owner)
      if (newQuery.tags && newQuery.tags.length > 0) {
        newQuery.tags.forEach((tag) => params.append("tags", tag))
      }
      if (newQuery.page > 1) params.set("page", newQuery.page.toString())
      if (newQuery.pageSize !== 20) params.set("pageSize", newQuery.pageSize.toString())
      if (newQuery.sort) params.set("sort", newQuery.sort)

      const queryString = params.toString()
      router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`, { scroll: false })
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

