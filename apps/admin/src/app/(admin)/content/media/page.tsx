import { PageHeader } from "@/components/shared/page-header"
import { PageBody } from "@/components/shared/page-body"
import { MediaLibrary } from "@/components/content/media/media-library"

export default function MediaPage() {
  return (
    <>
      <PageHeader
        title="Media Library"
        subtitle="Manage your media files"
      />
      <PageBody>
        <MediaLibrary />
      </PageBody>
    </>
  )
}
