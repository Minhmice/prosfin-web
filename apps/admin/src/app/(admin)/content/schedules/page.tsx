import { PageHeader } from "@/components/shared/page-header"
import { PageBody } from "@/components/shared/page-body"
import { SchedulesView } from "@/components/content/schedules/schedules-view"

export default function SchedulesPage() {
  return (
    <>
      <PageHeader
        title="Schedules"
        subtitle="Manage scheduled posts and publishing queue"
      />
      <PageBody>
        <SchedulesView />
      </PageBody>
    </>
  )
}
