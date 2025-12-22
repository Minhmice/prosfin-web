"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import type { ScheduleItem } from "@/features/content/types"
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns"

interface CalendarWeekHeaderProps {
  weekStart: Date
  schedules: ScheduleItem[]
}

export function CalendarWeekHeader({
  weekStart,
  schedules,
}: CalendarWeekHeaderProps) {
  const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 })
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

  const channelCounts = React.useMemo(() => {
    const counts: Record<string, number> = {}
    schedules.forEach((schedule) => {
      const channel = schedule.channel || "facebook"
      counts[channel] = (counts[channel] || 0) + 1
    })
    return counts
  }, [schedules])

  return (
    <div className="flex items-center justify-between mb-4 p-3 bg-muted/50 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          Week of {format(weekStart, "MMM d")}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {Object.entries(channelCounts).map(([channel, count]) => (
          <Badge key={channel} variant="secondary" className="text-xs">
            {channel}: {count}
          </Badge>
        ))}
      </div>
    </div>
  )
}
