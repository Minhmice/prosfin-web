"use client"

import { KPICards } from "./kpi-cards"
import { TrendsWidget } from "./trends-widget"
import { RecentActivity } from "./recent-activity"
import { QuickActions } from "./quick-actions"

export function OverviewContent() {
  return (
    <div className="space-y-6">
      <KPICards />
      <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-3 lg:px-6">
        <div className="lg:col-span-2">
          <TrendsWidget />
        </div>
        <div className="space-y-4">
          <RecentActivity />
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
