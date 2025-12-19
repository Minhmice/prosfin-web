"use client"

import * as React from "react"
import { SchedulesCalendarWeek } from "./schedules-calendar-week"
import { useScheduleListQuery } from "@/hooks/use-schedule-list-query"

interface SchedulesCalendarProps {
  onDateSelect?: (date: Date) => void
}

export function SchedulesCalendar({ onDateSelect }: SchedulesCalendarProps) {
  const { query } = useScheduleListQuery()
  
  // Default to week view
  return (
    <SchedulesCalendarWeek
      onDateSelect={onDateSelect}
    />
  )
}
