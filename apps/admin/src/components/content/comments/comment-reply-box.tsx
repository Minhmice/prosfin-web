"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { IconSend } from "@tabler/icons-react"
import { toast } from "sonner"

interface CommentReplyBoxProps {
  commentId: string
  onReplySent?: () => void
}

export function CommentReplyBox({ commentId, onReplySent }: CommentReplyBoxProps) {
  const [reply, setReply] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reply.trim()) return

    setIsSubmitting(true)
    try {
      // Mock reply - in real app, call API
      await new Promise((resolve) => setTimeout(resolve, 500))
      toast.success("Reply sent")
      setReply("")
      onReplySent?.()
    } catch (error) {
      toast.error("Failed to send reply")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Label htmlFor="reply">Reply</Label>
      <Textarea
        id="reply"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Write a reply..."
        rows={3}
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting || !reply.trim()}>
          <IconSend className="mr-2 size-4" />
          Send Reply
        </Button>
      </div>
    </form>
  )
}
