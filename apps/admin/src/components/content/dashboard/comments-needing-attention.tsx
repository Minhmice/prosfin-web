"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IconExternalLink } from "@tabler/icons-react"
import { mockComments, mockPosts } from "@/data/content-mock"
import type { Comment } from "@/features/content/types"
import { format } from "date-fns"

interface CommentsNeedingAttentionProps {
  onCommentClick?: (comment: Comment) => void
}

const columns: ColumnDef<Comment & { postTitle?: string }>[] = [
  {
    accessorKey: "authorName",
    header: "Author",
    cell: ({ row }) => {
      // Guard against undefined row.original
      if (!row?.original) return <div className="font-medium">-</div>
      return <div className="font-medium">{row.original.authorName || "-"}</div>
    },
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => {
      // Guard against undefined row.original
      if (!row?.original) return <div className="max-w-[200px] truncate text-sm text-muted-foreground">-</div>
      return (
      <div className="max-w-[200px] truncate text-sm text-muted-foreground">
          {row.original.content || "-"}
      </div>
      )
    },
  },
  {
    accessorKey: "postTitle",
    header: "Post",
    cell: ({ row }) => {
      // Guard against undefined row.original
      if (!row?.original) return <div className="max-w-[150px] truncate text-sm">Unknown</div>
      return (
      <div className="max-w-[150px] truncate text-sm">
        {row.original.postTitle || "Unknown"}
      </div>
      )
    },
  },
  {
    accessorKey: "channel",
    header: "Channel",
    cell: ({ row }) => {
      // Guard against undefined row.original
      if (!row?.original) return <Badge variant="outline">-</Badge>
      return <Badge variant="outline">{row.original.channel || "-"}</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // Guard against undefined row.original
      if (!row?.original) return null
      return (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            const event = new CustomEvent("openCommentDetail", { detail: row.original })
            window.dispatchEvent(event)
          }}
        >
          <IconExternalLink className="size-4" />
        </Button>
      )
    },
  },
]

export function CommentsNeedingAttention({ onCommentClick }: CommentsNeedingAttentionProps) {
  const [pendingComments, setPendingComments] = React.useState<
    Array<Comment & { postTitle?: string }>
  >([])

  React.useEffect(() => {
    const pending = mockComments
      .filter((c) => c.status === "pending")
      .slice(0, 5)
      .map((comment) => {
        // Guard against undefined mockPosts
        if (!mockPosts || !Array.isArray(mockPosts)) {
          return {
            ...comment,
            postTitle: undefined,
          }
        }
        const post = mockPosts.find((p) => p?.id === comment?.postId)
        return {
          ...comment,
          postTitle: post?.title,
        }
      })

    setPendingComments(pending)
  }, [])

  React.useEffect(() => {
    const handleOpenComment = (e: CustomEvent<Comment>) => {
      if (onCommentClick) {
        onCommentClick(e.detail)
      }
    }

    window.addEventListener("openCommentDetail", handleOpenComment as EventListener)
    return () => {
      window.removeEventListener("openCommentDetail", handleOpenComment as EventListener)
    }
  }, [onCommentClick])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments Needing Attention</CardTitle>
        <CardDescription>Pending moderation</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          data={pendingComments}
          columns={columns}
          enableRowSelection={false}
          enableColumnVisibility={false}
          enableSorting={false}
          enableFiltering={false}
          initialPageSize={5}
        />
      </CardContent>
    </Card>
  )
}
