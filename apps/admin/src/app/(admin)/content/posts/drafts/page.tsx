import { PostsTablePage } from "@/features/content/posts/posts-table-page"

export default function DraftsPage() {
  return (
    <PostsTablePage
      defaultStatus="draft"
      title="Drafts"
      subtitle="Posts in draft status"
    />
  )
}
