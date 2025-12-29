"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { PageHeader } from "@/components/shared/page-header"
import { ContentKPICards } from "./kpi-cards"
import { ChartsSection } from "./charts-section"
import { TopPostsTable } from "./top-posts-table"
import { UpcomingSchedulesTable } from "./upcoming-schedules-table"
import { CommentsNeedingAttention } from "./comments-needing-attention"
import { DateRangePicker } from "@/components/shared/date-range-picker"
import { ShareLinkButton } from "@/components/shared/share-link-button"
import { Button } from "@/components/ui/button"
import { parseContentParams, buildContentUrl } from "@/lib/url-state-content"
import type { Post, ScheduleItem, Comment } from "@/features/content/types"

export function ContentDashboard() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [dateRange, setDateRange] = React.useState<{ from?: Date; to?: Date }>()

  const params = React.useMemo(() => {
    try {
      const result = parseContentParams(new URLSearchParams(searchParams))
      return result
    } catch (error: any) {
      return {}
    }
  }, [searchParams])

  const handleDateRangeChange = (range: { from?: Date; to?: Date } | undefined) => {
    try {
      setDateRange(range)
      const newParams = {
        ...(params || {}),
        from: range?.from?.toISOString(),
        to: range?.to?.toISOString(),
      }
      const url = buildContentUrl("/content", newParams)
      router.push(url)
    } catch (error: any) {
      // Error handling
    }
  }

  const handlePostClick = (post: Post) => {
    router.push(`/content/posts/${post.id}/edit`)
  }

  const handleScheduleClick = (schedule: ScheduleItem) => {
    router.push(`/content/schedules?postId=${schedule.postId}`)
  }

  const handleCommentClick = (comment: Comment) => {
    router.push(`/content/comments?postId=${comment.postId}&commentId=${comment.id}`)
  }

  return (
    <>
      <PageHeader
        title="Content Dashboard"
        subtitle="Overview of your content and publishing schedule"
        actions={
          <div className="flex items-center gap-2">
            <DateRangePicker
              value={dateRange}
              onChange={handleDateRangeChange}
              className="w-[300px]"
            />
            <ShareLinkButton path="/content" params={params || {}} size="sm" />
            <Button variant="outline" size="sm">
              Export Snapshot
            </Button>
          </div>
        }
      />
      <div className="space-y-6 px-4 lg:px-6">
        <ContentKPICards />

        <ChartsSection />

        <div className="space-y-4">
          <TopPostsTable onPostClick={handlePostClick} />
          <CommentsNeedingAttention onCommentClick={handleCommentClick} />
          <UpcomingSchedulesTable onScheduleClick={handleScheduleClick} />
        </div>
      </div>
    </>
  )
}
