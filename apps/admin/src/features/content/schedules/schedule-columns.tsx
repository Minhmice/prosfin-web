"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Calendar, MoreVertical } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { ScheduleItem } from "../types"
import { format } from "date-fns"

export function createScheduleColumns(): ColumnDef<ScheduleItem>[] {
  return [
    {
      accessorKey: "runAt",
      header: "Run At",
      cell: ({ row }) => {
        const runAt = row.getValue("runAt") as Date | undefined
        if (!runAt) return "-"
        return (
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-muted-foreground" />
            <span>{format(runAt, "MMM d, yyyy HH:mm")}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "channels",
      header: "Channels",
      cell: ({ row }) => {
        const channels = row.getValue("channels") as string[]
        return (
          <div className="flex items-center gap-1 flex-wrap">
            {channels.map((channel) => (
              <Badge key={channel} variant="secondary" className="text-xs">
                {channel}
              </Badge>
            ))}
          </div>
        )
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const action = row.getValue("action") as string
        return <Badge variant="outline">{action}</Badge>
      },
    },
    {
      accessorKey: "postId",
      header: "Post",
      cell: ({ row }) => {
        const postId = row.getValue("postId") as string
        const schedule = row.original
        const title = schedule.payloadSnapshot?.title || `Post ${postId}`
        return (
          <Link
            href={`/content/posts/${postId}/edit`}
            className="font-medium hover:underline"
          >
            {title}
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
          pending: "outline",
          running: "secondary",
          done: "default",
          failed: "destructive",
          canceled: "secondary",
        }[status as keyof typeof variant] || "outline"

        return <Badge variant={variant}>{status}</Badge>
      },
    },
    {
      accessorKey: "attempts",
      header: "Attempts",
      cell: ({ row }) => {
        const attempts = row.getValue("attempts") as number
        return <span>{attempts}</span>
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Updated",
      cell: ({ row }) => {
        const date = row.getValue("updatedAt") as Date
        return format(date, "MMM d, yyyy")
      },
    },
  ]
}
