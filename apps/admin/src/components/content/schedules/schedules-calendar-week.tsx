"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CalendarWeekHeader } from "./calendar-week-header"
import { CalendarEventPill } from "./calendar-event-pill"
import { contentProvider } from "@/features/content/data/provider"
import type { ScheduleItem } from "@/features/content/types"
import { startOfWeek, endOfWeek, eachDayOfInterval, addWeeks, subWeeks, format, isSameDay } from "date-fns"
import { useScheduleListQuery } from "@/hooks/use-schedule-list-query"
import { useRouter } from "next/navigation"

interface SchedulesCalendarWeekProps {
  onDateSelect?: (date: Date) => void
  onScheduleClick?: (schedule: ScheduleItem) => void
}

export function SchedulesCalendarWeek({
  onDateSelect,
  onScheduleClick,
}: SchedulesCalendarWeekProps) {
  const router = useRouter()
  const { query, updateQuery } = useScheduleListQuery()
  const [schedules, setSchedules] = React.useState<ScheduleItem[]>([])
  const [currentWeek, setCurrentWeek] = React.useState(() => {
    const from = query.from ? new Date(query.from) : new Date()
    return startOfWeek(from, { weekStartsOn: 1 })
  })

  React.useEffect(() => {
    const loadSchedules = async () => {
      const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 })
      const from = new Date(currentWeek)
      from.setHours(0, 0, 0, 0)
      const to = new Date(weekEnd)
      to.setHours(23, 59, 59, 999)

      const result = await contentProvider.listSchedules({
        view: "calendar",
        range: "week",
        from,
        to,
        channel: query.channel,
        status: query.status,
        page: 1,
        pageSize: 1000,
      })
      setSchedules(result.data)
    }

    loadSchedules()
  }, [currentWeek, query.channel, query.status])

  const weekDays = eachDayOfInterval({
    start: currentWeek,
    end: endOfWeek(currentWeek, { weekStartsOn: 1 }),
  })

  const getSchedulesForDate = (date: Date) => {
    return schedules.filter((schedule) => {
      const runAt = schedule.runAt || schedule.scheduledAt
      if (!runAt) return false
      return isSameDay(runAt, date)
    })
  }

  const handlePreviousWeek = () => {
    const prevWeek = subWeeks(currentWeek, 1)
    setCurrentWeek(prevWeek)
    const weekEnd = endOfWeek(prevWeek, { weekStartsOn: 1 })
    updateQuery({
      from: prevWeek.toISOString(),
      to: weekEnd.toISOString(),
    })
  }

  const handleNextWeek = () => {
    const nextWeek = addWeeks(currentWeek, 1)
    setCurrentWeek(nextWeek)
    const weekEnd = endOfWeek(nextWeek, { weekStartsOn: 1 })
    updateQuery({
      from: nextWeek.toISOString(),
      to: weekEnd.toISOString(),
    })
  }

  const handleToday = () => {
    const today = startOfWeek(new Date(), { weekStartsOn: 1 })
    setCurrentWeek(today)
    const weekEnd = endOfWeek(today, { weekStartsOn: 1 })
    updateQuery({
      from: today.toISOString(),
      to: weekEnd.toISOString(),
    })
  }

  const handleCreateSchedule = (date: Date) => {
    router.push(`/content/schedules?action=create&runAt=${date.toISOString()}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePreviousWeek}>
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="outline" onClick={handleToday}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextWeek}>
            <ChevronRight className="size-4" />
          </Button>
          <span className="ml-4 font-medium">
            {format(currentWeek, "MMM d")} - {format(endOfWeek(currentWeek, { weekStartsOn: 1 }), "MMM d, yyyy")}
          </span>
        </div>
      </div>

      <CalendarWeekHeader weekStart={currentWeek} schedules={schedules} />

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => {
          const daySchedules = getSchedulesForDate(day)
          const isToday = isSameDay(day, new Date())

          return (
            <div
              key={day.toISOString()}
              className={`
                border rounded-lg p-2 min-h-[120px] space-y-1
                ${isToday ? "bg-accent/50 border-primary" : "bg-background"}
              `}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`
                  text-sm font-medium
                  ${isToday ? "text-primary" : ""}
                `}>
                  {format(day, "d")}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-5"
                  onClick={() => handleCreateSchedule(day)}
                >
                  <Plus className="size-3" />
                </Button>
              </div>
              <div className="space-y-1">
                {daySchedules.slice(0, 3).map((schedule) => (
                  <CalendarEventPill
                    key={schedule.id}
                    schedule={schedule}
                    onClick={() => {
                      if (onScheduleClick) {
                        onScheduleClick(schedule)
                      } else {
                        router.push(`/content/schedules?scheduleId=${schedule.id}`)
                      }
                    }}
                  />
                ))}
                {daySchedules.length > 3 && (
                  <div className="text-xs text-muted-foreground px-2">
                    +{daySchedules.length - 3} more
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
