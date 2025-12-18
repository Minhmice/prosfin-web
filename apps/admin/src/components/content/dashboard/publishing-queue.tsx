"use client"

import * as React from "react"
import Link from "next/link"
import { Calendar, MoreVertical } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { contentProvider } from "@/features/content/data/provider"
import type { Post } from "@/features/content/types"

export function PublishingQueue() {
  const [queue, setQueue] = React.useState<Post[]>([])

  React.useEffect(() => {
    const loadQueue = async () => {
      const now = new Date()
      const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
      const result = await contentProvider.listPosts({
        status: "scheduled",
        page: 1,
        pageSize: 10,
      })
      
      const next7Days = result.data
        .filter((p) => p.scheduledAt && p.scheduledAt >= now && p.scheduledAt <= sevenDaysLater)
        .sort((a, b) => (a.scheduledAt?.getTime() || 0) - (b.scheduledAt?.getTime() || 0))
        .slice(0, 7)
      
      setQueue(next7Days)
    }

    loadQueue()
  }, [])

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleReschedule = (postId: string) => {
    // Will be implemented in Phase 2.5
    console.log("Reschedule", postId)
  }

  const handleCancel = async (postId: string) => {
    await contentProvider.cancelSchedule(postId)
    setQueue((prev) => prev.filter((p) => p.id !== postId))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Publishing Queue</CardTitle>
        <CardDescription>Next 7 days scheduled posts</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {queue.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground py-8">
              No posts scheduled
            </div>
          ) : (
            <div className="space-y-3">
              {queue.map((post, index) => (
                <React.Fragment key={post.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/content/posts/${post.id}/edit`}
                        className="text-sm font-medium hover:underline block truncate"
                      >
                        {post.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="size-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {post.scheduledAt ? formatDateTime(post.scheduledAt) : "-"}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {post.status}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleReschedule(post.id)}>
                          Reschedule
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCancel(post.id)}>
                          Cancel
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/content/posts/${post.id}/edit`}>
                            Open
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {index < queue.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
