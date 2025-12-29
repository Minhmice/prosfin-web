"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import type { ColumnDef } from "@tanstack/react-table"
import { Calendar, MoreVertical } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/table"
import { ShareLinkButton } from "@/components/shared/share-link-button"
import { contentProvider } from "@/features/content/data/provider"
import { mockSchedules, mockPosts } from "@/data/content-mock"
import { parseContentParams, buildContentUrl } from "@/lib/url-state-content"
import type { ScheduleItem, Post } from "@/features/content/types"
import { toast } from "sonner"
import { format } from "date-fns"

interface SchedulesQueueProps {
  dateFilter?: Date
}

type ScheduleWithPost = ScheduleItem & { postTitle?: string }

const columns: ColumnDef<ScheduleWithPost>[] = [
  {
    accessorKey: "postTitle",
    header: "Post",
    cell: ({ row }) => {
      const schedule = row.original
      return (
        <Link
          href={`/content/posts/${schedule.postId}/edit`}
          className="font-medium hover:underline"
        >
          {schedule.postTitle || "Unknown"}
        </Link>
      )
    },
  },
  {
    accessorKey: "channel",
    header: "Channel",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.original.channel}
      </Badge>
    ),
  },
  {
    accessorKey: "scheduledAt",
    header: "Scheduled At",
    cell: ({ row }) => {
      const date = row.original.scheduledAt
      return (
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-muted-foreground" />
          <span>{date ? format(date, "PPp") : "-"}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="secondary">{row.original.status}</Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const schedule = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/content/schedules?scheduleId=${schedule.id}&action=edit`}>
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/content/posts/${schedule.postId}/edit`}>
                Open Post
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function SchedulesQueue({ dateFilter }: SchedulesQueueProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [schedules, setSchedules] = React.useState<ScheduleWithPost[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const params = React.useMemo(() => {
    return parseContentParams(new URLSearchParams(searchParams))
  }, [searchParams])

  React.useEffect(() => {
    const loadSchedules = async () => {
      setIsLoading(true)
      try {
        const dateFrom = params.from
          ? new Date(params.from)
          : dateFilter
          ? new Date(new Date(dateFilter).setHours(0, 0, 0, 0))
          : new Date()
        const dateTo = params.to
          ? new Date(params.to)
          : dateFilter
          ? new Date(new Date(dateFilter).setHours(23, 59, 59, 999))
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

        const filtered = mockSchedules
          .filter((s) => {
            if (params.channel && s.channel && !params.channel.includes(s.channel)) return false
            if (params.status && s.status !== params.status) return false
            const scheduleDate = s.scheduledAt
            return scheduleDate && scheduleDate >= dateFrom && scheduleDate <= dateTo
          })
          .map((schedule) => {
            const post = mockPosts.find((p) => p.id === schedule.postId)
            return {
              ...schedule,
              postTitle: post?.title,
            }
          })
          .sort((a, b) => (a.scheduledAt?.getTime() || 0) - (b.scheduledAt?.getTime() || 0))

        setSchedules(filtered)
      } catch (error) {
        toast.error("Failed to load schedules")
      } finally {
        setIsLoading(false)
      }
    }

    loadSchedules()
  }, [dateFilter, params])

  const handlePaginationChange = (page: number, pageSize: number) => {
    const newParams = { ...params, page, pageSize }
    const url = buildContentUrl("/content/schedules", newParams)
    router.push(url)
  }

  const handleSortingChange = (sort: { field: string; direction: "asc" | "desc" } | null) => {
    const newParams = {
      ...params,
      sort: sort ? `${sort.field}:${sort.direction}` : undefined,
    }
    const url = buildContentUrl("/content/schedules", newParams)
    router.push(url)
  }

  const handleFilterChange = (filters: Record<string, any>) => {
    const newParams = {
      ...params,
      ...filters,
      page: 1,
    }
    const url = buildContentUrl("/content/schedules", newParams)
    router.push(url)
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading schedules...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-2">
        <ShareLinkButton path="/content/schedules" params={params} size="sm" />
      </div>
      <DataTable
        data={schedules}
        columns={columns}
        enableRowSelection={false}
        enableColumnVisibility
        enableSorting
        enableFiltering
        manualPagination
        manualSorting
        manualFiltering
        pageCount={Math.ceil(schedules.length / (params.pageSize || 20))}
        rowCount={schedules.length}
        initialPage={params.page || 1}
        initialPageSize={params.pageSize || 20}
        onPaginationChange={handlePaginationChange}
        onSortingChange={handleSortingChange}
        onFilterChange={handleFilterChange}
      />
    </div>
  )
}
