/**
 * Schedule List Query Hook
 * Sync URL state with schedule filters/view/range/sort/pagination
 */

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback, useMemo } from "react"
import { useDebouncedCallback } from "use-debounce"
import type { ScheduleStatus } from "@/features/content/types"

export interface ScheduleListQuery {
  view?: "calendar" | "list"
  range?: "week" | "month" | "custom"
  from?: string // ISO date string
  to?: string // ISO date string
  channel?: string
  status?: ScheduleStatus
  postId?: string
  q?: string
  sort?: string
  page: number
  pageSize: number
}

export function useScheduleListQuery() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Parse query from URL
  const query = useMemo(() => {
    const page = searchParams.get("page")
    const pageSize = searchParams.get("pageSize")
    const channels = searchParams.getAll("channel")

    return {
      view: (searchParams.get("view") as "calendar" | "list") || "calendar",
      range: (searchParams.get("range") as "week" | "month" | "custom") || "week",
      from: searchParams.get("from") || undefined,
      to: searchParams.get("to") || undefined,
      channel: channels.length > 0 ? channels[0] : undefined,
      status: (searchParams.get("status") as ScheduleStatus) || undefined,
      postId: searchParams.get("postId") || undefined,
      q: searchParams.get("q") || undefined,
      sort: searchParams.get("sort") || undefined,
      page: page ? parseInt(page, 10) : 1,
      pageSize: pageSize ? parseInt(pageSize, 10) : 20,
    }
  }, [searchParams])

  // Update query in URL
  const updateQuery = useCallback(
    (updates: Partial<ScheduleListQuery>) => {
      const newQuery = { ...query, ...updates }
      const params = new URLSearchParams()

      if (newQuery.view && newQuery.view !== "calendar") params.set("view", newQuery.view)
      if (newQuery.range && newQuery.range !== "week") params.set("range", newQuery.range)
      if (newQuery.from) params.set("from", newQuery.from)
      if (newQuery.to) params.set("to", newQuery.to)
      if (newQuery.channel) params.set("channel", newQuery.channel)
      if (newQuery.status) params.set("status", newQuery.status)
      if (newQuery.postId) params.set("postId", newQuery.postId)
      if (newQuery.q) params.set("q", newQuery.q)
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
