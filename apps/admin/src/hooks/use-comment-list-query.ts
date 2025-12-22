/**
 * Comment List Query Hook
 * Sync URL state with comment filters/view/sort/pagination
 */

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback, useMemo } from "react"
import { useDebouncedCallback } from "use-debounce"
import type { CommentChannel, CommentStatus } from "@/features/content/types"

export interface CommentListQuery {
  channel?: CommentChannel
  q?: string
  postId?: string
  status?: CommentStatus
  source?: string
  from?: string // ISO date string
  to?: string // ISO date string
  sort?: string
  page: number
  pageSize: number
  thread?: string // commentId to highlight
}

export function useCommentListQuery() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Parse query from URL
  const query = useMemo(() => {
    const page = searchParams.get("page")
    const pageSize = searchParams.get("pageSize")

    return {
      channel: (searchParams.get("channel") as CommentChannel) || "public",
      q: searchParams.get("q") || undefined,
      postId: searchParams.get("postId") || undefined,
      status: (searchParams.get("status") as CommentStatus) || undefined,
      source: searchParams.get("source") || undefined,
      from: searchParams.get("from") || undefined,
      to: searchParams.get("to") || undefined,
      sort: searchParams.get("sort") || undefined,
      thread: searchParams.get("thread") || undefined,
      page: page ? parseInt(page, 10) : 1,
      pageSize: pageSize ? parseInt(pageSize, 10) : 20,
    }
  }, [searchParams])

  // Update query in URL
  const updateQuery = useCallback(
    (updates: Partial<CommentListQuery>) => {
      const newQuery = { ...query, ...updates }
      const params = new URLSearchParams()

      if (newQuery.channel && newQuery.channel !== "public") params.set("channel", newQuery.channel)
      if (newQuery.q) params.set("q", newQuery.q)
      if (newQuery.postId) params.set("postId", newQuery.postId)
      if (newQuery.status) params.set("status", newQuery.status)
      if (newQuery.source) params.set("source", newQuery.source)
      if (newQuery.from) params.set("from", newQuery.from)
      if (newQuery.to) params.set("to", newQuery.to)
      if (newQuery.sort) params.set("sort", newQuery.sort)
      if (newQuery.thread) params.set("thread", newQuery.thread)
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

