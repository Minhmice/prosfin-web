"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/table"
import { PageHeader } from "@/components/shared/page-header"
import { PageBody } from "@/components/shared/page-body"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { contentProvider } from "../../data/provider"
import type { Post } from "../../types"
import { createPostColumns } from "./post-columns"
import { getPostRowActions, getPostBulkActions } from "./post-actions"
import { toast } from "sonner"

interface PostsTablePageProps {
  defaultStatus?: Post["status"]
  title: string
  subtitle: string
}

export function PostsTablePage({
  defaultStatus,
  title,
  subtitle,
}: PostsTablePageProps) {
  const router = useRouter()
  const [posts, setPosts] = React.useState<Post[]>([])
  const [total, setTotal] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(true)

  const columns = React.useMemo<ColumnDef<Post>[]>(
    () => createPostColumns(),
    []
  )

  const loadPosts = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await contentProvider.listPosts({
        status: defaultStatus,
        page: 1,
        pageSize: 50,
      })
      setPosts(result.data)
      setTotal(result.total)
    } catch (error) {
      toast.error("Failed to load posts")
    } finally {
      setIsLoading(false)
    }
  }, [defaultStatus])

  React.useEffect(() => {
    loadPosts()
  }, [loadPosts])

  const handleRowAction = async (action: string, row: Post) => {
    try {
      switch (action) {
        case "edit":
          router.push(`/content/posts/${row.id}/edit`)
          break
        case "duplicate":
          await contentProvider.duplicatePost(row.id)
          toast.success("Post duplicated")
          loadPosts()
          break
        case "publish":
          await contentProvider.publishPost(row.id)
          toast.success("Post published")
          loadPosts()
          break
        case "schedule":
          // Will open schedule dialog in Phase 2.3
          toast.info("Schedule dialog coming soon")
          break
        case "unschedule":
          await contentProvider.unschedulePost(row.id)
          toast.success("Schedule cancelled")
          loadPosts()
          break
        case "publishNow":
          await contentProvider.publishNow(row.id)
          toast.success("Post published")
          loadPosts()
          break
        case "unpublish":
          await contentProvider.unpublishPost(row.id)
          toast.success("Post unpublished")
          loadPosts()
          break
        case "archive":
          await contentProvider.updatePost(row.id, { status: "archived" })
          toast.success("Post archived")
          loadPosts()
          break
        case "restore":
          await contentProvider.updatePost(row.id, { status: "draft" })
          toast.success("Post restored")
          loadPosts()
          break
        case "delete":
          await contentProvider.deletePost(row.id)
          toast.success("Post deleted")
          loadPosts()
          break
      }
    } catch (error) {
      toast.error("Action failed")
    }
  }

  const handleBulkAction = async (action: string, rows: Post[]) => {
    try {
      switch (action) {
        case "bulkPublish":
          await Promise.all(rows.map((r) => contentProvider.publishPost(r.id)))
          toast.success(`${rows.length} posts published`)
          loadPosts()
          break
        case "bulkSchedule":
          toast.info("Bulk schedule coming soon")
          break
        case "bulkSetCategory":
          toast.info("Bulk set category coming soon")
          break
        case "bulkAddTag":
          toast.info("Bulk add tag coming soon")
          break
        case "bulkDelete":
          await Promise.all(rows.map((r) => contentProvider.deletePost(r.id)))
          toast.success(`${rows.length} posts deleted`)
          loadPosts()
          break
      }
    } catch (error) {
      toast.error("Bulk action failed")
    }
  }

  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
        actions={
          <Button onClick={() => router.push("/content/posts/new")}>
            <Plus className="mr-2 size-4" />
            New Post
          </Button>
        }
      />
      <PageBody>
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        ) : (
          <DataTable
            data={posts}
            columns={columns}
            enableRowSelection
            enableColumnVisibility
            enableSorting
            enableFiltering
            onRowAction={handleRowAction}
            onBulkAction={handleBulkAction}
            rowActions={getPostRowActions}
            bulkActions={getPostBulkActions()}
          />
        )}
      </PageBody>
    </>
  )
}
