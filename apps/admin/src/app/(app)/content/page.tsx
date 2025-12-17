"use client";

import { AdminPageShell } from "@prosfin/ui";
import { PostsTable } from "@/components/content/posts-table";

export default function ContentPage() {
  return (
    <AdminPageShell title="Content" description="Manage your blog posts and content">
      <PostsTable />
    </AdminPageShell>
  );
}

