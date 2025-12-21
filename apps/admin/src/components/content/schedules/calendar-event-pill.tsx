"use client"

import * as React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
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
}

export function CalendarEventPill({
  schedule,
  onClick,
}: CalendarEventPillProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: schedule.id,
    data: {
      type: "schedule",
      scheduleId: schedule.id,
      schedule,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const primaryChannel = schedule.channels[0] || "facebook"
  const channelColor = channelColors[primaryChannel] || "bg-gray-500"
  const statusColor = statusColors[schedule.status] || ""

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "flex items-center gap-1 px-2 py-1 rounded text-xs cursor-grab active:cursor-grabbing hover:opacity-80 transition-opacity border-l-2",
        statusColor,
        isDragging && "opacity-50"
      )}
      onClick={onClick}
    >
      <div className={cn("size-2 rounded-full", channelColor)} />
      <span className="truncate flex-1">
        {schedule.payloadSnapshot?.title || `Post ${schedule.postId}`}
      </span>
      {schedule.channels.length > 1 && (
        <Badge variant="secondary" className="text-xs px-1">
          +{schedule.channels.length - 1}
        </Badge>
      )}
    </div>
  )
}
