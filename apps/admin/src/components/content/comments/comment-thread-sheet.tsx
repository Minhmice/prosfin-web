"use client"

import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Check, MessageSquare } from "lucide-react"
import type { Comment, CommentChannel } from "@/features/content/types"
import { contentProvider } from "@/features/content/data/provider"
import { toast } from "sonner"
import { format } from "date-fns"

interface CommentThreadSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  commentId: string | null
  channel: CommentChannel
  onStatusUpdate?: () => void
}

const CANNED_RESPONSES = [
  "Thank you for your comment!",
  "We appreciate your feedback.",
  "We'll look into this and get back to you.",
  "Thanks for bringing this to our attention.",
  "We value your input.",
]

export function CommentThreadSheet({
  open,
  onOpenChange,
  commentId,
  channel,
  onStatusUpdate,
}: CommentThreadSheetProps) {
  const [thread, setThread] = React.useState<{ root: Comment; replies: Comment[] } | null>(null)
  const [replyBody, setReplyBody] = React.useState("")
  const [replyChannel, setReplyChannel] = React.useState<CommentChannel>(channel)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    if (open && commentId) {
      loadThread()
    } else {
      setThread(null)
      setReplyBody("")
    }
  }, [open, commentId])

  const loadThread = async () => {
    if (!commentId) return
    setIsLoading(true)
    try {
      const result = await contentProvider.getThread(commentId)
      setThread(result)
    } catch (error) {
      toast.error("Failed to load thread")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReply = async (approveAndReply = false) => {
    if (!commentId || !replyBody.trim()) return

    setIsSubmitting(true)
    try {
      await contentProvider.reply(commentId, replyBody, replyChannel)
      
      if (approveAndReply && channel === "public") {
        await contentProvider.updateStatus([commentId], "approved")
        onStatusUpdate?.()
      }
      
      toast.success("Reply sent")
      setReplyBody("")
      loadThread()
      if (approveAndReply) {
        onStatusUpdate?.()
      }
    } catch (error) {
      toast.error("Failed to send reply")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCannedResponse = (response: string) => {
    setReplyBody(response)
  }

  if (!thread) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="sm:max-w-[600px]">
          <SheetHeader>
            <SheetTitle>Thread</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            {isLoading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : (
              <p className="text-muted-foreground">Thread not found</p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle>Thread</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto">
          {/* Post Preview */}
          <div className="p-4 border rounded-lg bg-muted/50">
            <p className="text-sm font-medium">Post: {thread.root.postId}</p>
            <Badge variant="outline" className="mt-2">
              {thread.root.channel}
            </Badge>
          </div>

          {/* Root Comment */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="font-medium">{thread.root.author?.name || thread.root.authorName}</p>
                {thread.root.author?.source && (
                  <Badge variant="secondary" className="text-xs">
                    {thread.root.author.source}
                  </Badge>
                )}
              </div>
              <Badge variant="outline">{thread.root.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {format(new Date(thread.root.createdAt), "MMM d, yyyy 'at' h:mm a")}
            </p>
            <p className="text-sm">{thread.root.body || thread.root.content}</p>
          </div>

          <Separator />

          {/* Replies */}
          {thread.replies.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="size-4" />
                <p className="text-sm font-medium">
                  {thread.replies.length} {thread.replies.length === 1 ? "reply" : "replies"}
                </p>
              </div>
              {thread.replies.map((reply) => (
                <div key={reply.id} className="pl-4 border-l-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{reply.author?.name || reply.authorName}</p>
                    <Badge variant="outline" className="text-xs">{reply.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(reply.createdAt), "MMM d, yyyy 'at' h:mm a")}
                  </p>
                  <p className="text-sm">{reply.body || reply.content}</p>
                </div>
              ))}
            </div>
          )}

          <Separator />

          {/* Reply Composer */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Canned Responses</label>
              <Select onValueChange={handleCannedResponse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {CANNED_RESPONSES.map((response, idx) => (
                    <SelectItem key={idx} value={response}>
                      {response}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Reply as</label>
              <Select value={replyChannel} onValueChange={(v) => setReplyChannel(v as CommentChannel)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="internal">Internal Note</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Reply</label>
              <Textarea
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
                placeholder="Write your reply..."
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => handleReply(false)}
                disabled={!replyBody.trim() || isSubmitting}
              >
                Send Reply
              </Button>
              {channel === "public" && thread.root.status === "pending" && (
                <Button
                  onClick={() => handleReply(true)}
                  disabled={!replyBody.trim() || isSubmitting}
                  variant="default"
                >
                  <Check className="mr-2 size-4" />
                  Approve + Reply
                </Button>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

