"use client"

import * as React from "react"
import Link from "next/link"
import { Calendar, MoreVertical } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { contentProvider } from "@/features/content/data/provider"
import type { ScheduleItem, Post } from "@/features/content/types"
import { toast } from "sonner"

interface SchedulesQueueProps {
  dateFilter?: Date
}

export function SchedulesQueue({ dateFilter }: SchedulesQueueProps) {
  const [schedules, setSchedules] = React.useState<Array<ScheduleItem & { post?: Post }>>([])

  React.useEffect(() => {
    const loadSchedules = async () => {
      const dateFrom = dateFilter
        ? new Date(new Date(dateFilter).setHours(0, 0, 0, 0))
        : new Date()
      const dateTo = dateFilter
        ? new Date(new Date(dateFilter).setHours(23, 59, 59, 999))
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

      const result = await contentProvider.listSchedules({
        from: dateFrom,
        to: dateTo,
        page: 1,
        pageSize: 1000,
      })

      // Load post details for each schedule
      const schedulesWithPosts = await Promise.all(
        result.data.map(async (schedule) => {
          const post = await contentProvider.getPost(schedule.postId)
          const runAt = schedule.runAt || schedule.scheduledAt
          return { ...schedule, post: post || undefined, scheduledAt: runAt || new Date() }
        })
      )

      setSchedules(schedulesWithPosts.sort((a, b) =>
        (a.scheduledAt?.getTime() || 0) - (b.scheduledAt?.getTime() || 0)
      ))
    }

    loadSchedules()
  }, [dateFilter])

  const handleReschedule = (postId: string) => {
    // Will open reschedule dialog
    toast.info("Reschedule dialog coming soon")
  }

  const handleCancel = async (scheduleId: string) => {
    try {
      await contentProvider.cancelSchedule(scheduleId)
      toast.success("Schedule cancelled")
      setSchedules((prev) => prev.filter((s) => s.id !== scheduleId))
    } catch (error) {
      toast.error("Failed to cancel schedule")
    }
  }

  const handlePublishNow = async (postId: string) => {
    try {
      await contentProvider.publishNow(postId)
      toast.success("Post published")
      setSchedules((prev) => prev.filter((s) => s.postId !== postId))
    } catch (error) {
      toast.error("Failed to publish")
    }
  }

  const formatDateTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Post</TableHead>
            <TableHead>Scheduled At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                No scheduled posts
              </TableCell>
            </TableRow>
          ) : (
            schedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell>
                  {schedule.post ? (
                    <Link
                      href={`/content/posts/${schedule.post.id}/edit`}
                      className="font-medium hover:underline"
                    >
                      {schedule.post.title}
                    </Link>
                  ) : (
                    <span className="text-muted-foreground">Post not found</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-muted-foreground" />
                    <span>{schedule.scheduledAt ? formatDateTime(schedule.scheduledAt) : "-"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{schedule.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleReschedule(schedule.postId)}>
                        Reschedule
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handlePublishNow(schedule.postId)}>
                        Publish Now
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCancel(schedule.id)}>
                        Cancel
                      </DropdownMenuItem>
                      {schedule.post && (
                        <DropdownMenuItem asChild>
                          <Link href={`/content/posts/${schedule.post.id}/edit`}>
                            Open Post
                          </Link>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
