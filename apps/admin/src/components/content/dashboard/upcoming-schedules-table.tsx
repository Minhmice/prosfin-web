"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IconExternalLink } from "@tabler/icons-react"
import { mockSchedules, mockPosts } from "@/data/content-mock"
import type { ScheduleItem } from "@/features/content/types"
import { format } from "date-fns"

interface UpcomingSchedulesTableProps {
  onScheduleClick?: (schedule: ScheduleItem) => void
}

const columns: ColumnDef<ScheduleItem & { postTitle?: string }>[] = [
  {
    accessorKey: "postTitle",
    header: "Post",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate font-medium">
        {row.original.postTitle || "Unknown"}
      </div>
    ),
  },
  {
    accessorKey: "channel",
    header: "Channel",
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.channel}</Badge>
    ),
  },
  {
    accessorKey: "scheduledAt",
    header: "Scheduled",
    cell: ({ row }) => {
      const date = row.original.scheduledAt
      return date ? format(date, "MMM dd, yyyy HH:mm") : "-"
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
            const event = new CustomEvent("openScheduleDetail", { detail: row.original })
            window.dispatchEvent(event)
          }}
        >
          <IconExternalLink className="size-4" />
        </Button>
      )
    },
  },
]

export function UpcomingSchedulesTable({ onScheduleClick }: UpcomingSchedulesTableProps) {
  const [upcomingSchedules, setUpcomingSchedules] = React.useState<
    Array<ScheduleItem & { postTitle?: string }>
  >([])

  React.useEffect(() => {
    const now = new Date()
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

    const upcoming = mockSchedules
      .filter((s) => s.scheduledAt && s.scheduledAt >= now && s.scheduledAt <= sevenDaysFromNow)
      .sort((a, b) => (a.scheduledAt?.getTime() || 0) - (b.scheduledAt?.getTime() || 0))
      .slice(0, 5)
      .map((schedule) => {
        const post = mockPosts.find((p) => p.id === schedule.postId)
        return {
          ...schedule,
          postTitle: post?.title,
        }
      })

    setUpcomingSchedules(upcoming)
  }, [])

  React.useEffect(() => {
    const handleOpenSchedule = (e: CustomEvent<ScheduleItem>) => {
      if (onScheduleClick) {
        onScheduleClick(e.detail)
      }
    }

    window.addEventListener("openScheduleDetail", handleOpenSchedule as EventListener)
    return () => {
      window.removeEventListener("openScheduleDetail", handleOpenSchedule as EventListener)
    }
  }, [onScheduleClick])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Schedules</CardTitle>
        <CardDescription>Scheduled in next 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          data={upcomingSchedules}
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
