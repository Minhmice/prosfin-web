"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Post } from "@/features/content/types"
import { format } from "date-fns"

interface PostOverviewTabProps {
  post: Post
}

export function PostOverviewTab({ post }: PostOverviewTabProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-sm font-medium text-muted-foreground">Status</div>
            <Badge variant={post.status === "published" ? "default" : "outline"}>
              {post.status}
            </Badge>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Channels</div>
            <div className="flex gap-2 mt-1">
              {post.channels.map((channel) => (
                <Badge key={channel} variant="outline" className="capitalize">
                  {channel}
                </Badge>
              ))}
            </div>
          </div>
          {post.campaign && (
            <div>
              <div className="text-sm font-medium text-muted-foreground">Campaign</div>
              <Badge variant="secondary">{post.campaign}</Badge>
            </div>
          )}
          <div>
            <div className="text-sm font-medium text-muted-foreground">Author</div>
            <div className="text-sm">{post.authorName}</div>
          </div>
        </CardContent>
      </Card>

      {post.metrics && (
        <Card>
          <CardHeader>
            <CardTitle>Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Views</div>
                <div className="text-2xl font-bold">{post.metrics.views.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Engagement</div>
                <div className="text-2xl font-bold">{post.metrics.engagement.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Clicks</div>
                <div className="text-2xl font-bold">{post.metrics.clicks.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Dates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Created</span>
            <span className="text-sm">{format(post.createdAt, "PPp")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Updated</span>
            <span className="text-sm">{format(post.updatedAt, "PPp")}</span>
          </div>
          {post.publishedAt && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Published</span>
              <span className="text-sm">{format(post.publishedAt, "PPp")}</span>
            </div>
          )}
          {post.scheduledAt && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Scheduled</span>
              <span className="text-sm">{format(post.scheduledAt, "PPp")}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
