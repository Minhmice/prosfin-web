"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Post } from "@/features/content/types"
import { PostOverviewTab } from "./post-overview-tab"
import { PostScheduleTab } from "./post-schedule-tab"
import { PostMediaTab } from "./post-media-tab"
import { PostCommentsTab } from "./post-comments-tab"

interface PostDetailSheetProps {
  post: Post | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PostDetailSheet({ post, open, onOpenChange }: PostDetailSheetProps) {
  const searchParams = useSearchParams()
  const commentId = searchParams.get("commentId")
  const [activeTab, setActiveTab] = React.useState("overview")

  React.useEffect(() => {
    if (commentId) {
      setActiveTab("comments")
    }
  }, [commentId])

  if (!post) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{post.title}</SheetTitle>
          <SheetDescription>Manage post details and related content</SheetDescription>
        </SheetHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4">
            <PostOverviewTab post={post} />
          </TabsContent>
          <TabsContent value="schedule" className="mt-4">
            <PostScheduleTab post={post} />
          </TabsContent>
          <TabsContent value="media" className="mt-4">
            <PostMediaTab post={post} />
          </TabsContent>
          <TabsContent value="comments" className="mt-4">
            <PostCommentsTab post={post} highlightedCommentId={commentId || undefined} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
