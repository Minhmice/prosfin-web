"use client"

import * as React from "react"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CalendarEventPill } from "./calendar-event-pill"
import type { ScheduleItem } from "@/features/content/types"
import { cn } from "@/lib/utils"

interface CalendarDayCellProps {
  day: Date
  schedules: ScheduleItem[]
  isToday: boolean
  onCreateSchedule?: (date: Date) => void
  onScheduleClick?: (schedule: ScheduleItem) => void
}

export function CalendarDayCell({
  day,
  schedules,
  isToday,
  onCreateSchedule,
  onScheduleClick,
}: CalendarDayCellProps) {
  const dayId = `day:${format(day, "yyyy-MM-dd")}`
  
  const { setNodeRef, isOver } = useDroppable({
    id: dayId,
  })

  const scheduleIds = schedules.map((s) => s.id)

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "border rounded-lg p-2 min-h-[120px] space-y-1 transition-colors",
        isToday ? "bg-accent/50 border-primary" : "bg-background",
        isOver && "ring-2 ring-primary ring-offset-2"
      )}
    >
      <div className="flex items-center justify-between mb-1">
        <span
          className={cn(
            "text-sm font-medium",
            isToday && "text-primary"
          )}
        >
          {format(day, "d")}
        </span>
        {onCreateSchedule && (
          <Button
            variant="ghost"
            size="icon"
            className="size-5"
            onClick={() => onCreateSchedule(day)}
          >
            <Plus className="size-3" />
          </Button>
        )}
      </div>
      <SortableContext items={scheduleIds} strategy={verticalListSortingStrategy}>
        <div className="space-y-1">
          {schedules.slice(0, 3).map((schedule) => (
            <CalendarEventPill
              key={schedule.id}
              schedule={schedule}
              onClick={() => onScheduleClick?.(schedule)}
            />
          ))}
          {schedules.length > 3 && (
            <div className="text-xs text-muted-foreground px-2">
              +{schedules.length - 3} more
            </div>
          )}
          {isOver && schedules.length === 0 && (
            <div className="h-8 border-2 border-dashed border-primary/50 rounded flex items-center justify-center text-xs text-muted-foreground">
              Drop here
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  )
}

