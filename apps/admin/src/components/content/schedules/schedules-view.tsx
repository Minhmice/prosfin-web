"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SchedulesCalendar } from "./schedules-calendar"
import { SchedulesQueue } from "./schedules-queue"
import { CadenceGuardrails } from "./cadence-guardrails"
import { parseContentParams, buildContentUrl } from "@/lib/url-state-content"

export function SchedulesView() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>()

  const params = React.useMemo(() => {
    return parseContentParams(new URLSearchParams(searchParams))
  }, [searchParams])

  const currentView = params.view || "calendar"

  const handleViewChange = (view: string) => {
    const newParams = { ...params, view }
    const url = buildContentUrl("/content/schedules", newParams)
    router.push(url)
  }

  return (
    <div className="space-y-4">
      <CadenceGuardrails />
      <Tabs
        value={currentView}
        onValueChange={handleViewChange}
        className="w-full"
      >
        <TabsList>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar" className="mt-6">
          <SchedulesCalendar onDateSelect={setSelectedDate} />
          {selectedDate && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">
                Scheduled for {selectedDate.toLocaleDateString()}
              </h3>
              <SchedulesQueue dateFilter={selectedDate} />
            </div>
          )}
        </TabsContent>
        <TabsContent value="list" className="mt-6">
          <SchedulesQueue />
        </TabsContent>
      </Tabs>
    </div>
  )
}
