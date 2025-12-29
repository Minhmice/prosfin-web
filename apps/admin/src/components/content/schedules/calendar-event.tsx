"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ScheduleItem } from "@/features/content/types"
import { format } from "date-fns"
import { mockPosts } from "@/data/content-mock"

interface CalendarEventProps {
  schedule: ScheduleItem
  onClick?: () => void
}

export function CalendarEvent({ schedule, onClick }: CalendarEventProps) {
  const post = React.useMemo(() => {
    return mockPosts.find((p) => p.id === schedule.postId)
  }, [schedule.postId])

  const channelColors: Record<string, string> = {
    facebook: "bg-blue-500",
    tiktok: "bg-black",
    linkedin: "bg-blue-600",
    twitter: "bg-sky-500",
    instagram: "bg-pink-500",
  }

  const channelColor = channelColors[schedule.channel || "unknown"] || "bg-gray-500"

  return (
    <div
      className={cn(
        "flex items-center gap-1 px-2 py-1 rounded text-xs cursor-pointer hover:opacity-80 transition-opacity border-l-2 border-blue-400 bg-accent/50"
      )}
      onClick={onClick}
    >
      <div className={cn("size-2 rounded-full", channelColor)} />
      <span className="truncate flex-1 text-xs">
        {post?.title || "Unknown Post"}
      </span>
      <Badge variant="outline" className="text-xs capitalize ml-1">
        {schedule.channel}
      </Badge>
      <span className="text-xs text-muted-foreground">
        {schedule.scheduledAt ? format(schedule.scheduledAt, "HH:mm") : "N/A"}
      </span>
    </div>
  )
}
