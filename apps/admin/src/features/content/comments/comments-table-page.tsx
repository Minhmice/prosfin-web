"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/table"
import { PageHeader } from "@/components/shared/page-header"
import { PageBody } from "@/components/shared/page-body"
import { ShareLinkButton } from "@/components/shared/share-link-button"
import { mockComments } from "@/data/content-mock"
import { parseContentParams, buildContentUrl } from "@/lib/url-state-content"
import type { Comment } from "@/features/content/types"
import { createCommentColumns } from "./comment-columns"
import { getCommentRowActions, getCommentBulkActions } from "./comment-actions"
import { contentProvider } from "@/features/content/data/provider"
import { toast } from "sonner"

export function CommentsTablePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [comments, setComments] = React.useState<Comment[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  const params = React.useMemo(() => {
    return parseContentParams(new URLSearchParams(searchParams))
  }, [searchParams])

  const columns = React.useMemo<ColumnDef<Comment>[]>(
    () => createCommentColumns(),
    []
  )

  React.useEffect(() => {
    setIsLoading(true)
    let filtered = [...mockComments]

    if (params.q) {
      const query = params.q.toLowerCase()
      filtered = filtered.filter(
        (c) =>
          c.body.toLowerCase().includes(query) ||
          c.author.name.toLowerCase().includes(query)
      )
    }

    if (params.status) {
      filtered = filtered.filter((c) => c.status === params.status)
    }

    if (params.channel && params.channel.length > 0) {
      filtered = filtered.filter((c) => params.channel!.includes(c.channel))
    }

    if (params.postId) {
      filtered = filtered.filter((c) => c.postId === params.postId)
    }

    if (params.from) {
      const fromDate = new Date(params.from)
      filtered = filtered.filter((c) => c.createdAt >= fromDate)
    }

    if (params.to) {
      const toDate = new Date(params.to)
      filtered = filtered.filter((c) => c.createdAt <= toDate)
    }

    setComments(filtered)
    setIsLoading(false)
  }, [params])

  const handleRowAction = async (action: string, row: Comment) => {
    try {
      if (action === "openComments") {
        router.push(`/content/comments?postId=${row.postId}&commentId=${row.id}`)
        return
      }
      if (action === "reply") {
        router.push(`/content/comments?commentId=${row.id}&action=reply`)
        return
      }

      const statusMap: Record<string, Comment["status"]> = {
        approve: "approved",
        hide: "trash",
        spam: "spam",
        restore: "pending",
      }

      const newStatus = statusMap[action]
      if (newStatus) {
        await contentProvider.moderateComment(row.id, action as any)
        toast.success(`Comment ${action}d`)
        // Reload
        setComments((prev) =>
          prev.map((c) => (c.id === row.id ? { ...c, status: newStatus } : c))
        )
      }
    } catch (error) {
      toast.error("Action failed")
    }
  }

  const handleBulkAction = async (action: string, rows: Comment[]) => {
    try {
      const statusMap: Record<string, Comment["status"]> = {
        bulkApprove: "approved",
        bulkHide: "trash",
        bulkSpam: "spam",
      }

      const newStatus = statusMap[action]
      if (newStatus) {
        await Promise.all(
          rows.map((r) => contentProvider.moderateComment(r.id, action.replace("bulk", "").toLowerCase() as any))
        )
        toast.success(`${rows.length} comments updated`)
        setComments((prev) =>
          prev.map((c) => {
            const row = rows.find((r) => r.id === c.id)
            return row ? { ...c, status: newStatus } : c
          })
        )
      }
    } catch (error) {
      toast.error("Bulk action failed")
    }
  }

  const handlePaginationChange = (page: number, pageSize: number) => {
    const newParams = { ...params, page, pageSize }
    const url = buildContentUrl("/content/comments", newParams)
    router.push(url)
  }

  const handleSortingChange = (sort: { field: string; direction: "asc" | "desc" } | null) => {
    const newParams = {
      ...params,
      sort: sort ? `${sort.field}:${sort.direction}` : undefined,
    }
    const url = buildContentUrl("/content/comments", newParams)
    router.push(url)
  }

  const handleFilterChange = (filters: Record<string, any>) => {
    const newParams = {
      ...params,
      ...filters,
      page: 1,
    }
    const url = buildContentUrl("/content/comments", newParams)
    router.push(url)
  }

  return (
    <>
      <PageHeader
        title="Comments"
        subtitle="Moderate and manage comments"
        actions={
          <div className="flex items-center gap-2">
            <ShareLinkButton path="/content/comments" params={params} size="sm" />
          </div>
        }
      />
      <PageBody>
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading comments...</p>
          </div>
        ) : (
          <DataTable
            data={comments}
            columns={columns}
            enableRowSelection
            enableColumnVisibility
            enableSorting
            enableFiltering
            manualPagination
            manualSorting
            manualFiltering
            pageCount={Math.ceil(comments.length / (params.pageSize || 20))}
            rowCount={comments.length}
            initialPage={params.page || 1}
            initialPageSize={params.pageSize || 20}
            onPaginationChange={handlePaginationChange}
            onSortingChange={handleSortingChange}
            onFilterChange={handleFilterChange}
            onRowAction={handleRowAction}
            onBulkAction={handleBulkAction}
            rowActions={getCommentRowActions}
            bulkActions={getCommentBulkActions()}
            highlightedRowId={searchParams.get("commentId") || undefined}
          />
        )}
      </PageBody>
    </>
  )
}
