"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconMessageCircle } from "@tabler/icons-react"
import type { Post } from "@/features/content/types"
import { mockComments } from "@/data/content-mock"
import { format } from "date-fns"

interface PostCommentsTabProps {
  post: Post
  highlightedCommentId?: string
}

export function PostCommentsTab({ post, highlightedCommentId }: PostCommentsTabProps) {
  const router = useRouter()
  const commentsRef = React.useRef<HTMLDivElement>(null)

  const comments = React.useMemo(() => {
    return mockComments.filter((c) => c.postId === post.id)
  }, [post.id])

  React.useEffect(() => {
    if (highlightedCommentId && commentsRef.current) {
      const element = commentsRef.current.querySelector(
        `[data-comment-id="${highlightedCommentId}"]`
      )
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
        element.classList.add("bg-primary/10", "border-primary", "border-2", "rounded-md", "p-2")
        setTimeout(() => {
          element.classList.remove("bg-primary/10", "border-primary", "border-2", "rounded-md", "p-2")
        }, 3000)
      }
    }
  }, [highlightedCommentId])

  const handleViewAllComments = () => {
    router.push(`/content/comments?postId=${post.id}`)
  }

  return (
    <div className="space-y-4" ref={commentsRef}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Comments</h3>
          <p className="text-sm text-muted-foreground">
            {comments.length} comment{comments.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button variant="outline" onClick={handleViewAllComments}>
          View All
        </Button>
      </div>

      {comments.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <IconMessageCircle className="mx-auto size-12 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No comments yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {comments.map((comment) => (
            <Card
              key={comment.id}
              data-comment-id={comment.id}
              className={highlightedCommentId === comment.id ? "bg-primary/10 border-primary border-2" : ""}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{comment.authorName}</CardTitle>
                  <div className="flex items-center gap-2">
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
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{comment.content}</p>
                <div className="mt-2 text-xs text-muted-foreground">
                  {format(comment.createdAt, "PPp")}
                </div>
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-3 pl-4 border-l-2 space-y-2">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="text-sm">
                        <div className="font-medium">{reply.authorName}</div>
                        <div className="text-muted-foreground">{reply.content}</div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
