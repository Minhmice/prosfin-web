"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PostPreviewCard } from "./post-preview-card"
import { CommentReplyBox } from "./comment-reply-box"
import { CannedResponses } from "./canned-responses"
import { mockComments, mockPosts } from "@/data/content-mock"
import type { Comment } from "@/features/content/types"
import { format } from "date-fns"

interface CommentThreadDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  commentId: string | null
}

export function CommentThreadDrawer({
  open,
  onOpenChange,
  commentId,
}: CommentThreadDrawerProps) {
  const router = useRouter()
  const [comment, setComment] = React.useState<Comment | null>(null)
  const [replies, setReplies] = React.useState<Comment[]>([])

  React.useEffect(() => {
    if (commentId) {
      const found = mockComments.find((c) => c.id === commentId)
      if (found) {
        setComment(found)
        setReplies(found.replies || [])
      }
    }
  }, [commentId])

  const post = React.useMemo(() => {
    if (!comment) return null
    return mockPosts.find((p) => p.id === comment.postId)
  }, [comment])

  const handleOpenPost = () => {
    if (comment) {
      router.push(`/content/posts/${comment.postId}/edit?commentId=${comment.id}`)
      onOpenChange(false)
    }
  }

  if (!comment || !post) return null

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle>Comment Thread</DrawerTitle>
          <DrawerDescription>View and reply to comment</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 py-4">
            <PostPreviewCard post={post} />

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">{comment.authorName}</div>
                    <Badge variant="outline" className="capitalize text-xs">
                      {comment.channel}
                    </Badge>
                    <Badge
                      variant={
                        comment.status === "pending"
                          ? "destructive"
                          : comment.status === "approved"
                          ? "default"
                          : "outline"
                      }
                      className="text-xs"
                    >
                      {comment.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {format(comment.createdAt, "PPp")}
                  </div>
                </div>
                <div className="text-sm">{comment.content}</div>
              </div>

              {replies.length > 0 && (
                <div className="space-y-3 pl-4 border-l-2">
                  {replies.map((reply) => (
                    <div key={reply.id} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="font-medium text-sm">{reply.authorName}</div>
                        <div className="text-xs text-muted-foreground">
                          {format(reply.createdAt, "PPp")}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{reply.content}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            <CommentReplyBox
              commentId={comment.id}
              onReplySent={() => {
                // Reload replies
                const updated = mockComments.find((c) => c.id === commentId)
                if (updated) {
                  setReplies(updated.replies || [])
                }
              }}
            />

            <CannedResponses onSelect={(response) => {
              // Handle canned response
            }} />
          </div>
        </ScrollArea>
        <DrawerFooter>
          <Button onClick={handleOpenPost} className="w-full">
            Open Post
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
