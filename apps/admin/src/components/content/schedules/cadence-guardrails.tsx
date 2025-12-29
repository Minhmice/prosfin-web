"use client"

import * as React from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { IconAlertTriangle } from "@tabler/icons-react"
import { mockSchedules } from "@/data/content-mock"
import { startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns"

interface CadenceGuardrailsProps {
  week?: Date
}

export function CadenceGuardrails({ week = new Date() }: CadenceGuardrailsProps) {
  const [warnings, setWarnings] = React.useState<Array<{ type: string; message: string }>>([])

  React.useEffect(() => {
    const weekStart = startOfWeek(week, { weekStartsOn: 1 })
    const weekEnd = endOfWeek(week, { weekStartsOn: 1 })
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

    const weekSchedules = mockSchedules.filter((s) => {
      const scheduleDate = s.scheduledAt
      return scheduleDate && weekDays.some((day) => isSameDay(scheduleDate, day))
    })

    const channelDistribution: Record<string, number> = {}
    weekSchedules.forEach((s) => {
      const channel = s.channel || "unknown"
      channelDistribution[channel] = (channelDistribution[channel] || 0) + 1
    })

    const newWarnings: Array<{ type: string; message: string }> = []

    if (!channelDistribution["facebook"] || channelDistribution["facebook"] < 3) {
      newWarnings.push({
        type: "missing",
        message: "Facebook channel has fewer than 3 posts scheduled this week",
      })
    }

    const totalSchedules = weekSchedules.length
    if (totalSchedules > 20) {
      newWarnings.push({
        type: "overload",
        message: `Too many schedules (${totalSchedules}) this week. Consider spreading out.`,
      })
    }

    setWarnings(newWarnings)
  }, [week])

  if (warnings.length === 0) return null

  return (
    <div className="space-y-2">
      {warnings.map((warning, index) => (
        <Alert key={index} variant={warning.type === "overload" ? "destructive" : "default"}>
          <IconAlertTriangle className="size-4" />
          <AlertTitle>Cadence Warning</AlertTitle>
          <AlertDescription>{warning.message}</AlertDescription>
        </Alert>
      ))}
    </div>
  )
}
