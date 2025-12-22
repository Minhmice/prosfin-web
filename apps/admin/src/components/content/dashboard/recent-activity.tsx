"use client";

import * as React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { contentProvider } from "@/features/content/data/provider";

interface Activity {
  id: string;
  type:
    | "post_created"
    | "post_published"
    | "post_scheduled"
    | "media_uploaded"
    | "comment_approved";
  message: string;
  timestamp: Date;
  actor: string;
}

async function generateActivities(): Promise<Activity[]> {
  const activities: Activity[] = [];

  // This will be replaced with activity events system in Phase 2.8
  // For now, generate from recent posts, media, comments
  const now = new Date();

  // Mock activities from recent posts
  try {
    const result = await contentProvider.listPosts({ page: 1, pageSize: 5 });
    if (result?.data) {
      result.data.forEach((post) => {
        if (post?.status === "published" && post?.publishedAt) {
          const daysAgo =
            (now.getTime() - post.publishedAt.getTime()) /
            (1000 * 60 * 60 * 24);
          if (daysAgo <= 7) {
            activities.push({
              id: `activity-${post.id}`,
              type: "post_published",
              message: `Post "${post.title}" published`,
              timestamp: post.publishedAt,
              actor: post.authorName || "Unknown",
            });
          }
        }
      });
    }
  } catch (error) {
    console.error("Error generating activities:", error);
  }

  return activities
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 8);
}

export function ContentRecentActivity() {
  const [activities, setActivities] = React.useState<Activity[]>([]);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    // Generate activities only on client
    generateActivities()
      .then((generated) => {
        setActivities(generated);
      })
      .catch((error) => {
        console.error("Error loading activities:", error);
        setActivities([]);
      });
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest content updates</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {activities.length === 0 && isMounted ? (
            <div className="text-center text-sm text-muted-foreground py-8">
              No recent activity
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <React.Fragment key={activity.id}>
                  <div className="flex items-start gap-3">
                    <Avatar className="size-8">
                      <AvatarFallback className="text-xs">
                        {getInitials(activity.actor)}
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
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
