"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarEvent } from "./calendar-event"
import { mockSchedules } from "@/data/content-mock"
import type { ScheduleItem } from "@/features/content/types"
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  format,
  isSameDay,
  isSameMonth,
  startOfWeek,
  endOfWeek,
} from "date-fns"
import { useRouter } from "next/navigation"

interface SchedulesCalendarMonthProps {
  onDateSelect?: (date: Date) => void
  onScheduleClick?: (schedule: ScheduleItem) => void
}

export function SchedulesCalendarMonth({
  onDateSelect,
  onScheduleClick,
}: SchedulesCalendarMonthProps) {
  const router = useRouter()
  const [currentMonth, setCurrentMonth] = React.useState(() => startOfMonth(new Date()))
  const [schedules, setSchedules] = React.useState<ScheduleItem[]>([])

  React.useEffect(() => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const dateFrom = new Date(monthStart)
    dateFrom.setHours(0, 0, 0, 0)
    const dateTo = new Date(monthEnd)
    dateTo.setHours(23, 59, 59, 999)

    const filtered = mockSchedules.filter((s) => {
      const scheduleDate = s.scheduledAt
      return scheduleDate && scheduleDate >= dateFrom && scheduleDate <= dateTo
    })
    setSchedules(filtered)
  }, [currentMonth])

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 })
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  })

  const getSchedulesForDate = (date: Date) => {
    return schedules.filter((schedule) => {
      const scheduleDate = schedule.scheduledAt
      return scheduleDate && isSameDay(scheduleDate, date)
    })
  }

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handleToday = () => {
    setCurrentMonth(startOfMonth(new Date()))
  }

  const handleCreateSchedule = (date: Date) => {
    router.push(`/content/schedules?action=create&runAt=${date.toISOString()}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="outline" onClick={handleToday}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="size-4" />
          </Button>
          <span className="ml-4 font-medium text-lg">
            {format(currentMonth, "MMMM yyyy")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 border rounded-lg p-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
        {calendarDays.map((day) => {
          const daySchedules = getSchedulesForDate(day)
          const isToday = isSameDay(day, new Date())
          const isCurrentMonth = isSameMonth(day, currentMonth)

          return (
            <div
              key={day.toISOString()}
              className={`
                border rounded-lg p-2 min-h-[100px] space-y-1
                ${isToday ? "bg-accent/50 border-primary" : "bg-background"}
                ${!isCurrentMonth ? "opacity-50" : ""}
              `}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`
                  text-sm font-medium
                  ${isToday ? "text-primary" : ""}
                `}
                >
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
                {daySchedules.slice(0, 2).map((schedule) => (
                  <CalendarEvent
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
                {daySchedules.length > 2 && (
                  <div className="text-xs text-muted-foreground px-1">
                    +{daySchedules.length - 2}
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
