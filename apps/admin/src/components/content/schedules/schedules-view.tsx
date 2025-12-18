"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SchedulesCalendar } from "./schedules-calendar"
import { SchedulesQueue } from "./schedules-queue"

export function SchedulesView() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>()

  return (
    <Tabs defaultValue="calendar" className="w-full">
      <TabsList>
        <TabsTrigger value="calendar">Calendar</TabsTrigger>
        <TabsTrigger value="queue">Queue</TabsTrigger>
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
            <SchedulesQueue dateFilter={selectedDate} />
          </div>
        )}
      </TabsContent>
      <TabsContent value="queue" className="mt-6">
        <SchedulesQueue />
      </TabsContent>
    </Tabs>
  )
}
