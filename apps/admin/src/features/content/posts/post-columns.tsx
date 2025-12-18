"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { FileText, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Post } from "../../types"

export function createPostColumns(): ColumnDef<Post>[] {
  return [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const post = row.original
        const statusIcon = {
          draft: <FileText className="size-4 text-muted-foreground" />,
          scheduled: <Calendar className="size-4 text-blue-500" />,
          published: <FileText className="size-4 text-green-500" />,
          archived: <FileText className="size-4 text-muted-foreground" />,
        }[post.status]

        return (
          <div className="flex items-center gap-2">
            {statusIcon}
            <Link
              href={`/content/posts/${post.id}/edit`}
              className="font-medium hover:underline"
            >
              {post.title}
            </Link>
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
          draft: "outline",
          scheduled: "secondary",
          published: "default",
          archived: "outline",
        }[status as keyof typeof variant] || "outline"

        return <Badge variant={variant}>{status}</Badge>
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("category") as string | undefined
        return category || "-"
      },
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: ({ row }) => {
        const tags = row.getValue("tags") as string[]
        if (tags.length === 0) return "-"
        const displayTags = tags.slice(0, 3)
        const moreCount = tags.length - 3

        return (
          <div className="flex items-center gap-1 flex-wrap">
            {displayTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {moreCount > 0 && (
              <span className="text-xs text-muted-foreground">
                +{moreCount}
              </span>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "authorName",
      header: "Author",
      cell: ({ row }) => {
        const authorName = row.getValue("authorName") as string
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
            <span className="text-sm">{authorName}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Updated",
      cell: ({ row }) => {
        const date = row.getValue("updatedAt") as Date
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      },
    },
    {
      accessorKey: "scheduledAt",
      header: "Scheduled",
      cell: ({ row }) => {
        const date = row.getValue("scheduledAt") as Date | undefined
        if (!date) return "-"
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      },
    },
  ]
}
