import { PostsTablePage } from "@/features/content/posts/posts-table-page"

export default function ScheduledPage() {
  return (
    <PostsTablePage
      defaultStatus="scheduled"
      title="Scheduled Posts"
      subtitle="Posts scheduled for publication"
    />
  )
}
