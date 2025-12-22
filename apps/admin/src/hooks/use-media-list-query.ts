/**
 * Media List Query Hook
 * Sync URL state with media filters/view/sort/pagination
 */

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback, useMemo } from "react"
import { useDebouncedCallback } from "use-debounce"

export interface MediaListQuery {
  view?: "grid" | "list"
  q?: string
  type?: "image" | "video" | "file"
  tag?: string
  used?: boolean
  from?: string // ISO date string
  to?: string // ISO date string
  sort?: string
  page: number
  pageSize: number
}

export function useMediaListQuery() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Parse query from URL
  const query = useMemo(() => {
    const page = searchParams.get("page")
    const pageSize = searchParams.get("pageSize")
    const used = searchParams.get("used")

    return {
      view: (searchParams.get("view") as "grid" | "list") || "grid",
      q: searchParams.get("q") || undefined,
      type: (searchParams.get("type") as "image" | "video" | "file") || undefined,
      tag: searchParams.get("tag") || undefined,
      used: used ? used === "true" : undefined,
      from: searchParams.get("from") || undefined,
      to: searchParams.get("to") || undefined,
      sort: searchParams.get("sort") || undefined,
      page: page ? parseInt(page, 10) : 1,
      pageSize: pageSize ? parseInt(pageSize, 10) : 20,
    }
  }, [searchParams])

  // Update query in URL
  const updateQuery = useCallback(
    (updates: Partial<MediaListQuery>) => {
      const newQuery = { ...query, ...updates }
      const params = new URLSearchParams()

      if (newQuery.view && newQuery.view !== "grid") params.set("view", newQuery.view)
      if (newQuery.q) params.set("q", newQuery.q)
      if (newQuery.type) params.set("type", newQuery.type)
      if (newQuery.tag) params.set("tag", newQuery.tag)
      if (newQuery.used !== undefined) params.set("used", newQuery.used.toString())
      if (newQuery.from) params.set("from", newQuery.from)
      if (newQuery.to) params.set("to", newQuery.to)
      if (newQuery.sort) params.set("sort", newQuery.sort)
      if (newQuery.page && newQuery.page !== 1) params.set("page", newQuery.page.toString())
      if (newQuery.pageSize && newQuery.pageSize !== 20) params.set("pageSize", newQuery.pageSize.toString())

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

