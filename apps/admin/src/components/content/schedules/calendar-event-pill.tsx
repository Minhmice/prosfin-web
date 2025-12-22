"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ScheduleItem } from "@/features/content/types"

interface CalendarEventPillProps {
  schedule: ScheduleItem
  onClick?: () => void
}

const channelColors: Record<string, string> = {
  facebook: "bg-blue-500",
  tiktok: "bg-black",
  linkedin: "bg-blue-600",
  twitter: "bg-sky-500",
  instagram: "bg-pink-500",
}

const statusColors: Record<string, string> = {
  pending: "border-yellow-500",
  running: "border-blue-500",
  done: "border-green-500",
  failed: "border-red-500",
  canceled: "border-gray-400",
  queued: "border-blue-400",
  sent: "border-green-400",
  cancelled: "border-gray-400",
}

export function CalendarEventPill({
  schedule,
  onClick,
}: CalendarEventPillProps) {
  const primaryChannel = schedule.channel || "facebook"
  const channelColor = channelColors[primaryChannel] || "bg-gray-500"
  const statusColor = statusColors[schedule.status] || ""

  return (
    <div
      className={cn(
        "flex items-center gap-1 px-2 py-1 rounded text-xs cursor-pointer hover:opacity-80 transition-opacity border-l-2",
        statusColor
      )}
      onClick={onClick}
    >
      <div className={cn("size-2 rounded-full", channelColor)} />
      <span className="truncate flex-1">
        Schedule {schedule.id}
      </span>
    </div>
  )
}
