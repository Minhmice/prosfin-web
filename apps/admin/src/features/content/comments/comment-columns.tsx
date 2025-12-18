"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { Comment } from "../../types"

export function createCommentColumns(): ColumnDef<Comment>[] {
  return [
    {
      accessorKey: "content",
      header: "Comment",
      cell: ({ row }) => {
        const content = row.getValue("content") as string
        const excerpt = content.length > 100
          ? `${content.substring(0, 100)}...`
          : content
        return (
          <div className="max-w-md">
            <p className="text-sm">{excerpt}</p>
          </div>
        )
      },
    },
    {
      accessorKey: "postId",
      header: "Post",
      cell: ({ row }) => {
        const postId = row.getValue("postId") as string
        return (
          <Link
            href={`/content/posts/${postId}/edit`}
            className="text-sm text-primary hover:underline"
          >
            View Post
          </Link>
        )
      },
    },
    {
      accessorKey: "authorName",
      header: "Author",
      cell: ({ row }) => {
        const authorName = row.getValue("authorName") as string
        const authorEmail = row.original.authorEmail
        return (
          <div>
            <p className="text-sm font-medium">{authorName}</p>
            {authorEmail && (
              <p className="text-xs text-muted-foreground">{authorEmail}</p>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const variant = {
          pending: "outline",
          approved: "default",
          spam: "destructive",
          trashed: "secondary",
        }[status as keyof typeof variant] || "outline"

        return <Badge variant={variant}>{status}</Badge>
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as Date
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      },
    },
  ]
}
