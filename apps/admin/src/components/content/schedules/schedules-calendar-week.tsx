"use client"

import * as React from "react"
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import {
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CalendarWeekHeader } from "./calendar-week-header"
import { CalendarEventPill } from "./calendar-event-pill"
import { CalendarDayCell } from "./calendar-day-cell"
import { contentProvider } from "@/features/content/data/provider"
import type { ScheduleItem } from "@/features/content/types"
import { startOfWeek, endOfWeek, eachDayOfInterval, addWeeks, subWeeks, format, isSameDay, parse, setHours, setMinutes } from "date-fns"
import { useScheduleListQuery } from "@/hooks/use-schedule-list-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

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
  const [activeSchedule, setActiveSchedule] = React.useState<ScheduleItem | null>(null)
  const [pendingUpdate, setPendingUpdate] = React.useState<{
    scheduleId: string
    oldRunAt: Date
    newRunAt: Date
  } | null>(null)
  const [showPastDateDialog, setShowPastDateDialog] = React.useState(false)
  const [currentWeek, setCurrentWeek] = React.useState(() => {
    const from = query.from ? new Date(query.from) : new Date()
    return startOfWeek(from, { weekStartsOn: 1 })
  })

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

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

  const [announcement, setAnnouncement] = React.useState<string>("")

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const schedule = schedules.find((s) => s.id === active.id)
    if (schedule) {
      setActiveSchedule(schedule)
      const title = schedule.payloadSnapshot?.title || `Post ${schedule.postId}`
      setAnnouncement(`Picked up schedule: ${title}`)
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveSchedule(null)
    const { active, over } = event

    if (!over || !active) {
      setAnnouncement("")
      return
    }

    const schedule = schedules.find((s) => s.id === active.id)
    if (!schedule) return

    const overId = over.id as string

    // If dropped on another schedule (same day reorder), just update local order
    // dnd-kit sortable will handle the visual reorder automatically
    // We don't need to persist orderIndex for now (it's UI-only)
    if (typeof overId === "string" && !overId.startsWith("day:")) {
      // This is a reorder within the same day - no API call needed
      // The visual order is already updated by SortableContext
      setAnnouncement("Schedule reordered")
      return
    }

    if (!overId.startsWith("day:")) return

    // Parse target date from "day:YYYY-MM-DD"
    const dateStr = overId.replace("day:", "")
    const targetDate = parse(dateStr, "yyyy-MM-dd", new Date())
    const dateLabel = format(targetDate, "MMMM d, yyyy")

    // Get current schedule time (HH:mm)
    const currentRunAt = schedule.runAt || schedule.scheduledAt
    if (!currentRunAt) {
      setAnnouncement("")
      return
    }

    const currentHours = currentRunAt.getHours()
    const currentMinutes = currentRunAt.getMinutes()

    // Combine new date with old time
    const newRunAt = new Date(targetDate)
    newRunAt.setHours(currentHours, currentMinutes, 0, 0)

    // Check if dropping into past
    const now = new Date()
    if (newRunAt < now) {
      setPendingUpdate({ scheduleId: schedule.id, oldRunAt: currentRunAt, newRunAt })
      setShowPastDateDialog(true)
      setAnnouncement(`Moving schedule to ${dateLabel} (past date - confirmation required)`)
      return
    }

    setAnnouncement(`Moving schedule to ${dateLabel}`)

    // Optimistic update
    const oldRunAt = currentRunAt
    setSchedules((prev) =>
      prev.map((s) =>
        s.id === schedule.id
          ? { ...s, runAt: newRunAt, scheduledAt: newRunAt }
          : s
      )
    )

    // Call API
    try {
      const response = await fetch(`/api/content/schedules/${schedule.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ runAt: newRunAt.toISOString() }),
      })

      if (!response.ok) {
        throw new Error("Failed to update schedule")
      }

      // Reload schedules to get fresh data
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

      // Toast with undo
      setAnnouncement(`Dropped schedule in ${dateLabel}`)

      toast.success("Schedule moved", {
        action: {
          label: "Undo",
          onClick: async () => {
            try {
              await fetch(`/api/content/schedules/${schedule.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ runAt: oldRunAt.toISOString() }),
              })
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
              toast.success("Schedule reverted")
              setAnnouncement("Schedule reverted")
            } catch (error) {
              toast.error("Failed to revert schedule")
            }
          },
        },
      })
    } catch (error) {
      // Rollback on error
      setSchedules((prev) =>
        prev.map((s) =>
          s.id === schedule.id
            ? { ...s, runAt: oldRunAt, scheduledAt: oldRunAt }
            : s
        )
      )
      toast.error("Failed to move schedule")
      setAnnouncement("Failed to move schedule")
    }
  }

  const handleConfirmPastDate = async () => {
    if (!pendingUpdate) return

    const schedule = schedules.find((s) => s.id === pendingUpdate.scheduleId)
    if (!schedule) return

    const { scheduleId, oldRunAt, newRunAt } = pendingUpdate

    // Optimistic update
    setSchedules((prev) =>
      prev.map((s) =>
        s.id === scheduleId
          ? { ...s, runAt: newRunAt, scheduledAt: newRunAt }
          : s
      )
    )

    setShowPastDateDialog(false)

    // Call API
    try {
      const response = await fetch(`/api/content/schedules/${scheduleId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ runAt: newRunAt.toISOString() }),
      })

      if (!response.ok) {
        throw new Error("Failed to update schedule")
      }

      // Reload schedules
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

      toast.success("Schedule moved", {
        action: {
          label: "Undo",
          onClick: async () => {
            try {
              await fetch(`/api/content/schedules/${scheduleId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ runAt: oldRunAt.toISOString() }),
              })
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
              toast.success("Schedule reverted")
            } catch (error) {
              toast.error("Failed to revert schedule")
            }
          },
        },
      })
    } catch (error) {
      // Rollback on error
      setSchedules((prev) =>
        prev.map((s) =>
          s.id === scheduleId
            ? { ...s, runAt: oldRunAt, scheduledAt: oldRunAt }
            : s
        )
      )
      toast.error("Failed to move schedule")
    } finally {
      setPendingUpdate(null)
    }
  }

  return (
    <>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
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
              <CalendarDayCell
                key={day.toISOString()}
                day={day}
                schedules={daySchedules}
                isToday={isToday}
                onCreateSchedule={handleCreateSchedule}
                onScheduleClick={(schedule) => {
                  if (onScheduleClick) {
                    onScheduleClick(schedule)
                  } else {
                    router.push(`/content/schedules?scheduleId=${schedule.id}`)
                  }
                }}
              />
            )
          })}
        </div>
      </div>

      <DragOverlay>
        {activeSchedule ? (
          <div className="opacity-90 scale-105">
            <CalendarEventPill schedule={activeSchedule} />
          </div>
        ) : null}
      </DragOverlay>

      <AlertDialog open={showPastDateDialog} onOpenChange={setShowPastDateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Schedule in the past</AlertDialogTitle>
            <AlertDialogDescription>
              You are trying to move a schedule to a past date. Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingUpdate(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmPastDate}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DndContext>
    </>
  )
}
