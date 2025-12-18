import { DataTable } from "@/components/data-table"
import { StatsCards } from "@/components/dashboard/sections/stats-cards"
import { VisitorsChart } from "@/components/dashboard/sections/visitors-chart"
import { RecentActivity } from "@/components/dashboard/sections/recent-activity"
import { QuickActions } from "@/components/dashboard/sections/quick-actions"

import data from "./data.json"

export default function DashboardPage() {
  return (
    <>
      <StatsCards />
      <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-3 lg:px-6">
        <div className="lg:col-span-2">
          <VisitorsChart />
        </div>
        <div className="space-y-4">
          <RecentActivity />
          <QuickActions />
        </div>
      </div>
      <DataTable data={data} />
    </>
  )
}
