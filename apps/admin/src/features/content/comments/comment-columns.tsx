"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { Comment } from "../types"
import { format } from "date-fns"

export function createCommentColumns(): ColumnDef<Comment>[] {
  return [
    {
      accessorKey: "author",
      header: "Author",
      cell: ({ row }) => {
        const comment = row.original
        const author = comment.author || { name: comment.authorName || "Unknown" }
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{author.name}</p>
              {author.source && (
                <Badge variant="secondary" className="text-xs">
                  {author.source}
                </Badge>
              )}
            </div>
            {author.email && (
              <p className="text-xs text-muted-foreground">{author.email}</p>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "body",
      header: "Snippet",
      cell: ({ row }) => {
        const body = row.original.body || row.original.content || ""
        const excerpt = body.length > 100
          ? `${body.substring(0, 100)}...`
          : body
        return (
          <div className="max-w-md">
            <p className="text-sm">{excerpt}</p>
          </div>
        )
      },
    },
    {
      id: "post",
      header: "Post",
      cell: ({ row }) => {
        const comment = row.original
        // In real app, fetch post title
        return (
          <div className="space-y-1">
            <Link
              href={`/content/posts/${comment.postId}/edit`}
              className="text-sm text-primary hover:underline"
            >
              Post {comment.postId}
            </Link>
            <Badge variant="outline" className="text-xs">
              {comment.channel}
            </Badge>
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
          rejected: "destructive",
          spam: "destructive",
          trash: "secondary",
          open: "outline",
          resolved: "default",
        }[status as keyof typeof variant] || "outline"

        return <Badge variant={variant}>{status}</Badge>
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as Date
        return format(new Date(date), "MMM d, yyyy")
      },
    },
  ]
}
