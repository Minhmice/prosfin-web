import { PageHeader } from "@/components/shared/page-header"
import { ContentDashboard } from "@/components/content/dashboard/content-dashboard"

export default function ContentPage() {
  return (
    <>
      <PageHeader
        title="Content Dashboard"
        subtitle="Overview of your content and publishing schedule"
      />
      <ContentDashboard />
    </>
  )
}
