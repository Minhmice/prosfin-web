"use client"

import { ContentKPICards } from "./kpi-cards"
import { PublishingQueue } from "./publishing-queue"
import { DraftsNeedingAttention } from "./drafts-needing-attention"
import { ContentRecentActivity } from "./recent-activity"
import { ContentQuickActions } from "./quick-actions"

export function ContentDashboard() {
  return (
    <div className="space-y-6">
      <ContentKPICards />
      <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-3 lg:px-6">
        <div className="lg:col-span-2 space-y-4">
          <PublishingQueue />
          <DraftsNeedingAttention />
        </div>
        <div className="space-y-4">
          <ContentRecentActivity />
          <ContentQuickActions />
        </div>
      </div>
    </div>
  )
}
