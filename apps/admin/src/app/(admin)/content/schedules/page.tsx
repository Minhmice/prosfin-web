"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { PageBody } from "@/components/shared/page-body"
import { SchedulesView } from "@/components/content/schedules/schedules-view"
import { ShareLinkButton } from "@/components/shared/share-link-button"
import { ScheduleFormSheet } from "@/components/content/schedules/schedule-form-sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { parseContentParams, buildContentUrl } from "@/lib/url-state-content"
import { mockSchedules } from "@/data/content-mock"
import type { ScheduleItem } from "@/features/content/types"

export default function SchedulesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [editingSchedule, setEditingSchedule] = React.useState<ScheduleItem | null>(null)

  const params = React.useMemo(() => {
    return parseContentParams(new URLSearchParams(searchParams))
  }, [searchParams])

  React.useEffect(() => {
    const action = searchParams.get("action")
    const postId = searchParams.get("postId")
    const scheduleId = searchParams.get("scheduleId")
    
    if (action === "create" || postId) {
      setIsSheetOpen(true)
    } else if (scheduleId) {
      const schedule = mockSchedules.find((s) => s.id === scheduleId)
      if (schedule) {
        setEditingSchedule(schedule)
        setIsSheetOpen(true)
      }
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
      const url = buildContentUrl("/content/schedules", params)
      router.push(url, { scroll: false })
    }
  }

  const handleChannelChange = (channel: string) => {
    const newParams = {
      ...params,
      channel: channel === "all" ? undefined : [channel],
      page: 1,
    }
    const url = buildContentUrl("/content/schedules", newParams)
    router.push(url)
  }

  return (
    <>
      <PageHeader
        title="Schedules"
        subtitle="Manage scheduled posts and publishing queue"
        actions={
          <div className="flex items-center gap-2">
            <Select
              value={params.channel?.[0] || "all"}
              onValueChange={handleChannelChange}
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
            <ShareLinkButton path="/content/schedules" params={params} size="sm" />
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
        schedule={editingSchedule || undefined}
        prefillPostId={searchParams.get("postId") || undefined}
        prefillDate={searchParams.get("runAt") ? new Date(searchParams.get("runAt")!) : undefined}
      />
    </>
  )
}
