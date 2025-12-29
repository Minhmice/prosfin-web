"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IconExternalLink } from "@tabler/icons-react"
import { mockPosts } from "@/data/content-mock"
import type { Post } from "@/features/content/types"
import { format } from "date-fns"

interface TopPostsTableProps {
  onPostClick?: (post: Post) => void
}

const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate font-medium">
        {row.original.title}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status
      const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
        published: "default",
        scheduled: "secondary",
        draft: "outline",
        archived: "destructive",
      }
      return <Badge variant={variants[status] || "outline"}>{status}</Badge>
    },
  },
  {
    accessorKey: "metrics",
    header: "Views",
    cell: ({ row }) => {
      const metrics = row.original.metrics
      return metrics ? metrics.views.toLocaleString() : "-"
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            const event = new CustomEvent("openPostDetail", { detail: row.original })
            window.dispatchEvent(event)
          }}
        >
          <IconExternalLink className="size-4" />
        </Button>
      )
    },
  },
]

export function TopPostsTable({ onPostClick }: TopPostsTableProps) {
  const [topPosts, setTopPosts] = React.useState<Post[]>([])

  React.useEffect(() => {
    // Get top posts by metrics (views)
    const postsWithMetrics = mockPosts
      .filter((p) => {
        return p.metrics && p.status === "published"
      })
      .sort((a, b) => (b.metrics?.views || 0) - (a.metrics?.views || 0))
      .slice(0, 5)

    setTopPosts(postsWithMetrics)
  }, [])

  React.useEffect(() => {
    const handleOpenPost = (e: CustomEvent<Post>) => {
      if (onPostClick) {
        onPostClick(e.detail)
      }
    }

    window.addEventListener("openPostDetail", handleOpenPost as EventListener)
    return () => {
      window.removeEventListener("openPostDetail", handleOpenPost as EventListener)
    }
  }, [onPostClick])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Posts</CardTitle>
        <CardDescription>Most viewed posts</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          data={topPosts}
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
