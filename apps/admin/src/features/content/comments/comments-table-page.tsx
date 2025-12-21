"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/table"
import { PageHeader } from "@/components/shared/page-header"
import { PageBody } from "@/components/shared/page-body"
import { CommentFilters } from "@/components/content/comments/comment-filters"
import { CommentThreadSheet } from "@/components/content/comments/comment-thread-sheet"
import { contentProvider } from "@/features/content/data/provider"
import type { Comment } from "@/features/content/types"
import { createCommentColumns } from "./comment-columns"
import { getCommentRowActions, getCommentBulkActions } from "./comment-actions"
import { useCommentListQuery } from "@/hooks/use-comment-list-query"
import { emitActivity } from "@/lib/activity-events"
import { toast } from "sonner"

export function CommentsTablePage() {
  const { query, updateQuery, updateSearch, resetFilters } = useCommentListQuery()
  const [comments, setComments] = React.useState<Comment[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [selectedRows, setSelectedRows] = React.useState<string[]>([])
  const [threadCommentId, setThreadCommentId] = React.useState<string | null>(null)

  const columns = React.useMemo<ColumnDef<Comment>[]>(
    () => createCommentColumns(),
    []
  )

  const loadComments = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const from = query.from ? new Date(query.from) : undefined
      const to = query.to ? new Date(query.to) : undefined

      const result = await contentProvider.listComments({
        q: query.q,
        postId: query.postId,
        channel: query.channel,
        status: query.status,
        source: query.source,
        from,
        to,
        sort: query.sort,
        page: query.page,
        pageSize: query.pageSize,
      })
      setComments(result.data)
    } catch (error) {
      toast.error("Failed to load comments")
    } finally {
      setIsLoading(false)
    }
  }, [query])

  React.useEffect(() => {
    loadComments()
  }, [loadComments])

  const handleRowAction = async (action: string, row: Comment) => {
    try {
      const statusMap: Record<string, Comment["status"]> = {
        approve: query.channel === "public" ? "approved" : "resolved",
        reject: query.channel === "public" ? "rejected" : "resolved",
        spam: "spam",
        trash: "trash",
        restore: query.channel === "public" ? "pending" : "open",
      }

      const newStatus = statusMap[action]
      if (newStatus) {
        await contentProvider.updateStatus([row.id], newStatus)
        if (action === "approve") {
          emitActivity.commentApproved(row.id, "Admin User")
        }
        toast.success(`Comment ${action}d`)
        loadComments()
      }
    } catch (error) {
      toast.error("Action failed")
    }
  }

  const handleBulkAction = async (action: string, rows: Comment[]) => {
    try {
      const statusMap: Record<string, Comment["status"]> = {
        bulkApprove: query.channel === "public" ? "approved" : "resolved",
        bulkReject: query.channel === "public" ? "rejected" : "resolved",
        bulkSpam: "spam",
        bulkDelete: "trash",
      }

      const newStatus = statusMap[action]
      if (newStatus) {
        await contentProvider.updateStatus(
          rows.map((r) => r.id),
          newStatus
        )
        toast.success(`${rows.length} comments updated`)
        loadComments()
        setSelectedRows([])
      }
    } catch (error) {
      toast.error("Bulk action failed")
    }
  }

  const handleExport = async () => {
    try {
      const csv = await contentProvider.exportComments(query, selectedRows.length > 0 ? selectedRows : undefined)
      const blob = new Blob([csv], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `comments-${new Date().toISOString()}.csv`
      a.click()
      URL.revokeObjectURL(url)
      toast.success("Comments exported")
    } catch (error) {
      toast.error("Export failed")
    }
  }

  // Default to pending status for public channel (moderation queue)
  React.useEffect(() => {
    if (query.channel === "public" && !query.status) {
      updateQuery({ status: "pending" })
    }
  }, [query.channel])

  // Auto-open thread if thread param in URL
  React.useEffect(() => {
    if (query.thread) {
      setThreadCommentId(query.thread)
    }
  }, [query.thread])

  const handleViewThread = (commentId: string) => {
    setThreadCommentId(commentId)
    updateQuery({ thread: commentId })
  }

  return (
    <>
      <PageHeader
        title="Comments"
        subtitle="Moderate and manage comments"
        actions={
          <Button variant="outline" onClick={handleExport}>
            Export CSV
          </Button>
        }
      />
      <PageBody>
        <Tabs
          value={query.channel || "public"}
          onValueChange={(value) => updateQuery({ channel: value as any, status: undefined, page: 1 })}
        >
          <TabsList>
            <TabsTrigger value="public">Public</TabsTrigger>
            <TabsTrigger value="internal">Internal</TabsTrigger>
          </TabsList>
          <TabsContent value="public" className="mt-6">
            <CommentFilters
              query={query}
              onQueryChange={updateQuery}
              onSearchChange={updateSearch}
              onResetFilters={resetFilters}
            />
            <div className="mt-4">
              <DataTable
                data={comments}
                columns={columns}
                isLoading={isLoading}
                selectedRows={selectedRows}
                onSelectedRowsChange={setSelectedRows}
                onRowAction={handleRowAction}
                onBulkAction={handleBulkAction}
                rowActions={getCommentRowActions}
                bulkActions={getCommentBulkActions()}
                pagination={{
                  page: query.page,
                  pageSize: query.pageSize,
                  total: comments.length,
                  onPageChange: (page) => updateQuery({ page }),
                  onPageSizeChange: (pageSize) => updateQuery({ pageSize, page: 1 }),
                }}
              />
            </div>
          </TabsContent>
          <TabsContent value="internal" className="mt-6">
            <CommentFilters
              query={query}
              onQueryChange={updateQuery}
              onSearchChange={updateSearch}
              onResetFilters={resetFilters}
            />
            <div className="mt-4">
              <DataTable
                data={comments}
                columns={columns}
                isLoading={isLoading}
                selectedRows={selectedRows}
                onSelectedRowsChange={setSelectedRows}
                onRowAction={(action, row) => {
                  if (action === "viewThread") {
                    handleViewThread(row.id)
                  } else {
                    handleRowAction(action, row)
                  }
                }}
                onBulkAction={handleBulkAction}
                rowActions={getCommentRowActions}
                bulkActions={getCommentBulkActions()}
                pagination={{
                  page: query.page,
                  pageSize: query.pageSize,
                  total: comments.length,
                  onPageChange: (page) => updateQuery({ page }),
                  onPageSizeChange: (pageSize) => updateQuery({ pageSize, page: 1 }),
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
        <CommentThreadSheet
          open={!!threadCommentId}
          onOpenChange={(open) => {
            if (!open) {
              setThreadCommentId(null)
              updateQuery({ thread: undefined })
            }
          }}
          commentId={threadCommentId}
          channel={query.channel || "public"}
          onStatusUpdate={loadComments}
        />
      </PageBody>
    </>
  )
}
