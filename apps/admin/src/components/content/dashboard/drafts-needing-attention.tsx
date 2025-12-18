"use client"

import * as React from "react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { contentProvider } from "@/features/content/data/provider"
import type { Post } from "@/features/content/types"

export function DraftsNeedingAttention() {
  const [drafts, setDrafts] = React.useState<Post[]>([])

  React.useEffect(() => {
    const loadDrafts = async () => {
      const result = await contentProvider.listPosts({
        status: "draft",
        page: 1,
        pageSize: 5,
        sort: "updatedAt:desc",
      })
      setDrafts(result.data)
    }

    loadDrafts()
  }, [])

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Drafts Needing Attention</CardTitle>
        <CardDescription>Recently updated drafts</CardDescription>
      </CardHeader>
      <CardContent>
        {drafts.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground py-8">
            No drafts
          </div>
        ) : (
          <div className="space-y-3">
            {drafts.map((draft) => (
              <div key={draft.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Avatar className="size-8">
                    <AvatarFallback className="text-xs">
                      {getInitials(draft.authorName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/content/posts/${draft.id}/edit`}
                      className="text-sm font-medium hover:underline block truncate"
                    >
                      {draft.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      Updated {formatDate(draft.updatedAt)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <Link href={`/content/posts/${draft.id}/edit`}>
                    Continue
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
