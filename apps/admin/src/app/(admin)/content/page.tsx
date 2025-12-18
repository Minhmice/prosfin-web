"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/table"
import { Badge } from "@/components/ui/badge"
import { mockPosts } from "@/data/posts"
import type { Post } from "@/types"
import { archivePost, unarchivePost, bulkArchivePosts } from "@/lib/actions/posts"
import { notifyInfo } from "@/lib/notify"

const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant="outline">
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as Date
      return date.toLocaleDateString()
    },
  },
  {
    accessorKey: "publishedAt",
    header: "Published",
    cell: ({ row }) => {
      const date = row.getValue("publishedAt") as Date | undefined
      return date ? date.toLocaleDateString() : "-"
    },
  },
]

export default function ContentPage() {
  const handleRowAction = async (action: string, row: Post) => {
    switch (action) {
      case "view":
        notifyInfo("View Post", `Opening ${row.title}`)
        break
      case "edit":
        notifyInfo("Edit Post", `Editing ${row.title}`)
        break
      case "archive":
        if (row.status === "archived") {
          await unarchivePost(row.id)
        } else {
          await archivePost(row.id)
        }
        break
      default:
        break
    }
  }

  const handleBulkAction = async (action: string, rows: Post[]) => {
    switch (action) {
      case "archive":
        await bulkArchivePosts(rows.map((r) => r.id))
        break
      default:
        break
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Content</h1>
        <p className="text-muted-foreground">Manage your content</p>
      </div>
      <DataTable
        data={mockPosts}
        columns={columns}
        enableRowSelection
        enableColumnVisibility
        enableSorting
        enableFiltering
        onRowAction={handleRowAction}
        onBulkAction={handleBulkAction}
      />
    </div>
  )
}
