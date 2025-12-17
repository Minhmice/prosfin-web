"use client";

import * as React from "react";
import Link from "next/link";
import { AdminPageShell } from "@prosfin/ui";
import { Button } from "@prosfin/ui";
import { Plus } from "lucide-react";
import { PostsTable } from "@/components/content/posts-table";

export default function ContentPage() {
  return (
    <AdminPageShell
      title="Content"
      description="Manage your blog posts and content"
      actions={
        <Button size="sm" asChild className="hidden sm:flex">
          <Link href="/content/new">
            <Plus className="mr-2 size-4" />
            New Post
          </Link>
        </Button>
      }
    >
      <PostsTable />
    </AdminPageShell>
  );
}

