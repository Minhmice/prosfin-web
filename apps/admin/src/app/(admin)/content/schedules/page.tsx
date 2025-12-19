"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { PageBody } from "@/components/shared/page-body"
import { SchedulesView } from "@/components/content/schedules/schedules-view"
import { RangeSelector } from "@/components/content/schedules/range-selector"
import { ShareLinkButton } from "@/components/content/schedules/share-link-button"
import { ScheduleFormSheet } from "@/features/content/schedules/schedule-form-sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useScheduleListQuery } from "@/hooks/use-schedule-list-query"
import { useRouter, useSearchParams } from "next/navigation"
import { contentProvider } from "@/features/content/data/provider"
import type { ScheduleItem } from "@/features/content/types"

export default function SchedulesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { query, updateQuery } = useScheduleListQuery()
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [editingSchedule, setEditingSchedule] = React.useState<ScheduleItem | null>(null)

  React.useEffect(() => {
    const action = searchParams.get("action")
    const postId = searchParams.get("postId")
    const scheduleId = searchParams.get("scheduleId")
    const runAt = searchParams.get("runAt")
    
    if (action === "create" || postId || runAt) {
      setIsSheetOpen(true)
    } else if (scheduleId) {
      const loadSchedule = async () => {
        const result = await contentProvider.listSchedules({ page: 1, pageSize: 1000 })
        const schedule = result.data.find((s) => s.id === scheduleId)
        if (schedule) {
          setEditingSchedule(schedule)
          setIsSheetOpen(true)
        }
      }
      loadSchedule()
    }
  }, [searchParams])

  const handleNewSchedule = () => {
    setIsSheetOpen(true)
    setEditingSchedule(null)
    router.push("/content/schedules?action=create", { scroll: false })
  }

  const handleSheetClose = (open: boolean) => {
    setIsSheetOpen(open)
    if (!open) {
      setEditingSchedule(null)
      router.push("/content/schedules", { scroll: false })
    }
  }

  const handleSuccess = () => {
    // Refresh will be handled by child components
  }

  return (
    <>
      <PageHeader
        title="Schedules"
        subtitle="Manage scheduled posts and publishing queue"
        actions={
          <div className="flex items-center gap-2">
            <RangeSelector
              range={query.range || "week"}
              from={query.from}
              to={query.to}
              onRangeChange={(range) => updateQuery({ range, page: 1 })}
              onDateChange={(from, to) => updateQuery({ from, to, page: 1 })}
            />
            <Select
              value={query.channel || "all"}
              onValueChange={(value) =>
                updateQuery({ channel: value === "all" ? undefined : value, page: 1 })
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Channels</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
              </SelectContent>
            </Select>
            <ShareLinkButton />
            <Button onClick={handleNewSchedule}>
              <Plus className="mr-2 size-4" />
              New Schedule
            </Button>
          </div>
        }
      />
      <PageBody>
        <SchedulesView />
      </PageBody>
      <ScheduleFormSheet
        open={isSheetOpen}
        onOpenChange={handleSheetClose}
        schedule={editingSchedule}
        defaultPostId={searchParams.get("postId") || undefined}
        defaultRunAt={searchParams.get("runAt") ? new Date(searchParams.get("runAt")!) : undefined}
        onSuccess={handleSuccess}
      />
    </>
  )
}
