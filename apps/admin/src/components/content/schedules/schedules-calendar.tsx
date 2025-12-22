"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SchedulesCalendarWeek } from "./schedules-calendar-week"
import { SchedulesCalendarMonth } from "./schedules-calendar-month"

interface SchedulesCalendarProps {
  onDateSelect?: (date: Date) => void
}

export function SchedulesCalendar({ onDateSelect }: SchedulesCalendarProps) {
  const [view, setView] = React.useState<"week" | "month">("week")

  return (
    <Tabs value={view} onValueChange={(v) => setView(v as "week" | "month")}>
      <TabsList>
        <TabsTrigger value="week">Week</TabsTrigger>
        <TabsTrigger value="month">Month</TabsTrigger>
      </TabsList>
      <TabsContent value="week" className="mt-4">
        <SchedulesCalendarWeek onDateSelect={onDateSelect} />
      </TabsContent>
      <TabsContent value="month" className="mt-4">
        <SchedulesCalendarMonth onDateSelect={onDateSelect} />
      </TabsContent>
    </Tabs>
  )
}
