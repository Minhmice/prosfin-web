"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { ScheduleItem } from "@/features/content/types"
import { format } from "date-fns"

export function createScheduleColumns(): ColumnDef<ScheduleItem>[] {
  return [
    {
      accessorKey: "scheduledAt",
      header: "Scheduled At",
      cell: ({ row }) => {
        const scheduledAt = row.getValue("scheduledAt") as Date | undefined
        if (!scheduledAt) return "-"
        return (
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-muted-foreground" />
            <span>{format(scheduledAt, "MMM d, yyyy HH:mm")}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "channel",
      header: "Channel",
      cell: ({ row }) => {
        const channel = row.getValue("channel") as string | undefined
        if (!channel) return "-"
        return <Badge variant="secondary" className="text-xs">{channel}</Badge>
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
            className="font-medium hover:underline"
          >
            Post {postId}
          </Link>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const variant = {
          queued: "outline",
          sent: "default",
          cancelled: "secondary",
        }[status as keyof typeof variant] || "outline"

        return <Badge variant={variant}>{status}</Badge>
      },
    },
  ]
}
