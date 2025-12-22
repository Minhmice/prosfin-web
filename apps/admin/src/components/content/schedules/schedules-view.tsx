"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SchedulesCalendar } from "./schedules-calendar"
import { SchedulesTablePage } from "@/features/content/schedules/schedules-table-page"
import { useScheduleListQuery } from "@/hooks/use-schedule-list-query"

export function SchedulesView() {
  const { query, updateQuery } = useScheduleListQuery()
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>()

  const currentView = query.view || "calendar"

  const handleViewChange = (view: "calendar" | "list") => {
    updateQuery({ view })
  }

  return (
    <Tabs
      value={currentView}
      onValueChange={(value) => handleViewChange(value as "calendar" | "list")}
      className="w-full"
    >
      <TabsList>
        <TabsTrigger value="calendar">Calendar</TabsTrigger>
        <TabsTrigger value="list">List</TabsTrigger>
      </TabsList>
      <TabsContent value="calendar" className="mt-6">
        <div className="flex justify-center">
          <SchedulesCalendar onDateSelect={setSelectedDate} />
        </div>
        {selectedDate && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">
              Scheduled for {selectedDate.toLocaleDateString()}
            </h3>
            {/* Will show filtered schedules for selected date */}
          </div>
        )}
      </TabsContent>
      <TabsContent value="list" className="mt-0">
        <SchedulesTablePage />
      </TabsContent>
    </Tabs>
  )
}
