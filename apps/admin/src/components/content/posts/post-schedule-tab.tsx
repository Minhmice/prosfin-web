"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IconPlus } from "@tabler/icons-react"
import type { Post } from "@/features/content/types"
import { mockSchedules } from "@/data/content-mock"
import { format } from "date-fns"

interface PostScheduleTabProps {
  post: Post
}

export function PostScheduleTab({ post }: PostScheduleTabProps) {
  const schedules = React.useMemo(() => {
    return mockSchedules.filter((s) => s.postId === post.id)
  }, [post.id])

  const handleCreateSchedule = () => {
    // Will be handled by parent or navigation
    window.dispatchEvent(
      new CustomEvent("openScheduleForm", { detail: { postId: post.id } })
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Schedules</h3>
          <p className="text-sm text-muted-foreground">
            Manage scheduled publishing for this post
          </p>
        </div>
        <Button onClick={handleCreateSchedule}>
          <IconPlus className="mr-2 size-4" />
          New Schedule
        </Button>
      </div>

      {schedules.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No schedules found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {schedules.map((schedule) => (
            <Card key={schedule.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {schedule.scheduledAt ? format(schedule.scheduledAt, "PPp") : "No date"}
                  </CardTitle>
                  <Badge variant="outline" className="capitalize">
                    {schedule.channel}
                  </Badge>
                </div>
                <CardDescription>Status: {schedule.status}</CardDescription>
              </CardHeader>
              {schedule.assignee && (
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Assignee: {schedule.assignee}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
