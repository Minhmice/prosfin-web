"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Comment } from "../types"
import { mockPosts } from "@/data/content-mock"
import { format } from "date-fns"

export function createCommentColumns(): ColumnDef<Comment>[] {
  return [
    {
      id: "author",
      header: "Author",
      cell: ({ row }) => {
        const comment = row.original
        const authorName = comment.author.name
        const initials = authorName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)

        return (
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium">{authorName}</div>
              {comment.author.email && (
                <div className="text-xs text-muted-foreground">{comment.author.email}</div>
              )}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "body",
      header: "Content",
      cell: ({ row }) => {
        const content = row.original.body || ""
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
      id: "post",
      header: "Post",
      cell: ({ row }) => {
        const comment = row.original
        const post = mockPosts.find((p) => p.id === comment.postId)
        return (
          <div className="space-y-1">
            <Link
              href={`/content/posts/${comment.postId}/edit`}
              className="text-sm text-primary hover:underline font-medium"
            >
              {post?.title || `Post ${comment.postId}`}
            </Link>
          </div>
        )
      },
    },
    {
      accessorKey: "channel",
      header: "Channel",
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize text-xs">
          {row.original.channel}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const variantMap: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
          pending: "outline",
          approved: "default",
          trash: "secondary",
          spam: "destructive",
        }
        const variant = (variantMap[status] || "outline") as "default" | "secondary" | "destructive" | "outline"
        return <Badge variant={variant}>{status}</Badge>
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as Date
        return (
          <div className="text-sm">
            {format(date, "MMM d, yyyy")}
            <br />
            <span className="text-xs text-muted-foreground">
              {format(date, "HH:mm")}
            </span>
          </div>
        )
      },
    },
  ]
}
