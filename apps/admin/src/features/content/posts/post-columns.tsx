"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { FileText, Calendar, Image } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { Post } from "../types"
import { mockComments } from "@/data/content-mock"

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
        const statusVariantMap = {
          draft: "outline",
          scheduled: "secondary",
          published: "default",
          archived: "outline",
        } as const
        const variant = (statusVariantMap[status as keyof typeof statusVariantMap] || "outline") as "outline" | "secondary" | "default"

        return <Badge variant={variant}>{status}</Badge>
      },
    },
    {
      accessorKey: "heroMediaId",
      header: "Hero Media",
      cell: ({ row }) => {
        const heroMediaId = row.getValue("heroMediaId") as string | undefined
        if (!heroMediaId) {
          return (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs"
              onClick={(e) => {
                e.stopPropagation()
                // Open media picker - would be handled by parent
              }}
            >
              <Image className="mr-1 size-3" />
              Attach
            </Button>
          )
        }
        return (
          <div className="flex items-center gap-2">
            <Image className="size-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Set</span>
          </div>
        )
      },
    },
    {
      accessorKey: "channels",
      header: "Channels",
      cell: ({ row }) => {
        const channels = row.getValue("channels") as string[]
        if (!channels || channels.length === 0) return "-"
        return (
          <div className="flex items-center gap-1 flex-wrap">
            {channels.slice(0, 2).map((channel) => (
              <Badge key={channel} variant="outline" className="text-xs capitalize">
                {channel}
              </Badge>
            ))}
            {channels.length > 2 && (
              <span className="text-xs text-muted-foreground">
                +{channels.length - 2}
              </span>
            )}
          </div>
        )
      },
    },
    {
      id: "comments",
      header: "Comments",
      cell: ({ row }) => {
        const post = row.original
        const postComments = mockComments.filter((c) => c.postId === post.id)
        const totalCount = postComments.length
        const pendingCount = postComments.filter((c) => c.status === "pending").length
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm">{totalCount}</span>
            {pendingCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {pendingCount} pending
              </Badge>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "campaign",
      header: "Campaign",
      cell: ({ row }) => {
        const campaign = row.getValue("campaign") as string | undefined
        if (!campaign) return "-"
        return <Badge variant="secondary" className="text-xs">{campaign}</Badge>
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
      header: "Scheduled At",
      cell: ({ row }) => {
        const date = row.getValue("scheduledAt") as Date | undefined
        if (!date) return "-"
        return (
          <div className="text-sm">
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
            <br />
            <span className="text-xs text-muted-foreground">
              {date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        )
      },
    },
  ]
}
