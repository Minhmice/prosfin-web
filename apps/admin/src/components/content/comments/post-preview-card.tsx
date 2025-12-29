"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Post } from "@/features/content/types"
import { format } from "date-fns"

interface PostPreviewCardProps {
  post: Post
}

export function PostPreviewCard({ post }: PostPreviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{post.title}</CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={post.status === "published" ? "default" : "outline"}>
              {post.status}
            </Badge>
            {post.channels.map((channel) => (
              <Badge key={channel} variant="outline" className="capitalize text-xs">
                {channel}
              </Badge>
            ))}
            {post.publishedAt && (
              <span className="text-xs text-muted-foreground">
                Published {format(post.publishedAt, "MMM d, yyyy")}
              </span>
            )}
            {post.scheduledAt && (
              <span className="text-xs text-muted-foreground">
                Scheduled {format(post.scheduledAt, "MMM d, yyyy")}
              </span>
            )}
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
