"use client"

import * as React from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockLeads } from "@/data/leads"
import { mockClients } from "@/data/clients"
import { mockPosts } from "@/data/posts"
import { activityEvents, type ActivityEvent } from "@/lib/activity-events"

interface Activity {
  id: string
  type: "lead" | "client" | "post" | "media" | "comment"
  message: string
  timestamp: Date
  user?: string
}

function generateActivities(): Activity[] {
  const activities: Activity[] = []
  const now = new Date()

  // Recent leads
  const recentLeads = mockLeads
    .filter((lead) => {
      const daysAgo = (now.getTime() - lead.createdAt.getTime()) / (1000 * 60 * 60 * 24)
      return daysAgo <= 7
    })
    .slice(0, 3)

  recentLeads.forEach((lead) => {
    activities.push({
      id: `lead-${lead.id}`,
      type: "lead",
      message: `New lead created: ${lead.name} from ${lead.company}`,
      timestamp: lead.createdAt,
      user: lead.name.split(" ")[0],
    })
  })

  // Recent client updates
  const recentClients = mockClients
    .filter((client) => {
      const daysAgo = (now.getTime() - client.createdAt.getTime()) / (1000 * 60 * 60 * 24)
      return daysAgo <= 7
    })
    .slice(0, 2)

  recentClients.forEach((client) => {
    activities.push({
      id: `client-${client.id}`,
      type: "client",
      message: `Client ${client.name} status updated to ${client.status}`,
      timestamp: client.createdAt,
      user: client.owner || "System",
    })
  })

  // Recent posts
  const recentPosts = mockPosts
    .filter((post) => {
      const daysAgo = (now.getTime() - post.updatedAt.getTime()) / (1000 * 60 * 60 * 24)
      return daysAgo <= 7 && post.status === "published"
    })
    .slice(0, 2)

  recentPosts.forEach((post) => {
    activities.push({
      id: `post-${post.id}`,
      type: "post",
      message: `Post "${post.title}" ${post.status === "published" ? "published" : "updated"}`,
      timestamp: post.updatedAt,
      user: "Admin",
    })
  })

  // Sort by timestamp (newest first) and take top 8
  return activities
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 8)
}

export function RecentActivity() {
  const [activities, setActivities] = React.useState<Activity[]>([])
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    // Generate activities only on client to avoid hydration mismatch
    setIsMounted(true)
    setActivities(generateActivities())

    // Subscribe to activity events
    const unsubscribe = activityEvents.subscribe((event: ActivityEvent) => {
      setActivities((prev) => {
        const newActivity: Activity = {
          id: `activity-${event.entityId}-${Date.now()}`,
          type: event.entity as Activity["type"],
          message: event.title,
          timestamp: event.timestamp,
          user: event.actor,
        }
        return [newActivity, ...prev].slice(0, 8)
      })
    })

    return unsubscribe
  }, [])

  const getInitials = (name?: string) => {
    if (!name) return "?"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates and changes</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {activities.length === 0 && isMounted ? (
              <div className="text-center text-sm text-muted-foreground py-8">
                No recent activity
              </div>
            ) : (
              activities.map((activity, index) => (
              <React.Fragment key={activity.id}>
                <div className="flex items-start gap-3">
                  <Avatar className="size-8">
                    <AvatarFallback className="text-xs">
                      {getInitials(activity.user)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
                {index < activities.length - 1 && <Separator />}
              </React.Fragment>
            ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
