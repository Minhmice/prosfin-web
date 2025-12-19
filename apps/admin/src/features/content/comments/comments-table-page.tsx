"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/table"
import { PageHeader } from "@/components/shared/page-header"
import { PageBody } from "@/components/shared/page-body"
import { contentProvider } from "@/features/content/data/provider"
import type { Comment } from "@/features/content/types"
import { createCommentColumns } from "./comment-columns"
import { getCommentRowActions, getCommentBulkActions } from "./comment-actions"
import { emitActivity } from "@/lib/activity-events"
import { toast } from "sonner"

export function CommentsTablePage() {
  const [comments, setComments] = React.useState<Comment[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const columns = React.useMemo<ColumnDef<Comment>[]>(
    () => createCommentColumns(),
    []
  )

  const loadComments = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await contentProvider.listComments({
        page: 1,
        pageSize: 50,
      })
      setComments(result.data)
    } catch (error) {
      toast.error("Failed to load comments")
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    loadComments()
  }, [loadComments])

  const handleRowAction = async (action: string, row: Comment) => {
    try {
      switch (action) {
        case "approve":
          await contentProvider.moderateComment(row.id, "approve")
          emitActivity.commentApproved(row.id, "Admin User")
          toast.success("Comment approved")
          loadComments()
          break
        case "reject":
          await contentProvider.moderateComment(row.id, "reject")
          toast.success("Comment rejected")
          loadComments()
          break
        case "spam":
          await contentProvider.moderateComment(row.id, "spam")
          toast.success("Comment marked as spam")
          loadComments()
          break
        case "restore":
          await contentProvider.moderateComment(row.id, "restore")
          toast.success("Comment restored")
          loadComments()
          break
        case "delete":
          await contentProvider.moderateComment(row.id, "reject")
          toast.success("Comment deleted")
          loadComments()
          break
      }
    } catch (error) {
      toast.error("Action failed")
    }
  }

  const handleBulkAction = async (action: string, rows: Comment[]) => {
    try {
      const actionMap: Record<string, "approve" | "reject" | "spam"> = {
        bulkApprove: "approve",
        bulkReject: "reject",
        bulkSpam: "spam",
      }

      const moderationAction = actionMap[action]
      if (moderationAction) {
        await contentProvider.bulkModerate(
          rows.map((r) => r.id),
          moderationAction
        )
        toast.success(`${rows.length} comments ${moderationAction}d`)
        loadComments()
      } else if (action === "bulkDelete") {
        await contentProvider.bulkModerate(
          rows.map((r) => r.id),
          "reject"
        )
        toast.success(`${rows.length} comments deleted`)
        loadComments()
      }
    } catch (error) {
      toast.error("Bulk action failed")
    }
  }

  return (
    <>
      <PageHeader
        title="Comments"
        subtitle="Moderate and manage comments"
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
            onRowAction={handleRowAction}
            onBulkAction={handleBulkAction}
            rowActions={getCommentRowActions}
            bulkActions={getCommentBulkActions()}
          />
        )}
      </PageBody>
    </>
  )
}
