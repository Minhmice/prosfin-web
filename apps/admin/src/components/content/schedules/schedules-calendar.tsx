"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { contentProvider } from "@/features/content/data/provider"
import type { ScheduleItem } from "@/features/content/types"
import { format } from "date-fns"

interface SchedulesCalendarProps {
  onDateSelect?: (date: Date) => void
}

export function SchedulesCalendar({ onDateSelect }: SchedulesCalendarProps) {
  const [schedules, setSchedules] = React.useState<ScheduleItem[]>([])
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>()

  React.useEffect(() => {
    const loadSchedules = async () => {
      const now = new Date()
      const dateFrom = new Date(now.getFullYear(), now.getMonth(), 1)
      const dateTo = new Date(now.getFullYear(), now.getMonth() + 2, 0)
      const items = await contentProvider.listSchedules({ dateFrom, dateTo })
      setSchedules(items)
    }

    loadSchedules()
  }, [])

  const getSchedulesForDate = (date: Date) => {
    return schedules.filter((s) => {
      const scheduleDate = new Date(s.scheduledAt)
      return (
        scheduleDate.getDate() === date.getDate() &&
        scheduleDate.getMonth() === date.getMonth() &&
        scheduleDate.getFullYear() === date.getFullYear()
      )
    })
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date && onDateSelect) {
      onDateSelect(date)
    }
  }

  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={handleDateSelect}
      modifiers={{
        hasSchedule: (date) => getSchedulesForDate(date).length > 0,
      }}
      modifiersClassNames={{
        hasSchedule: "relative",
      }}
      className="rounded-md border"
    />
  )
}
