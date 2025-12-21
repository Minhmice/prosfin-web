"use client"

import type { Post } from "../types"

export function getPostRowActions(post: Post): Array<{
  label: string
  action: string
  variant?: "default" | "destructive"
}> {
  const actions: Array<{
    label: string
    action: string
    variant?: "default" | "destructive"
  }> = [
    { label: "Edit", action: "edit" },
    { label: "Duplicate", action: "duplicate" },
  ]

  if (post.status === "draft") {
    actions.push({ label: "Publish", action: "publish" })
    actions.push({ label: "Schedule...", action: "schedule" })
  }

  if (post.status === "scheduled") {
    actions.push({ label: "Unschedule", action: "unschedule" })
    actions.push({ label: "Publish Now", action: "publishNow" })
  }

  if (post.status === "published") {
    actions.push({ label: "Unpublish", action: "unpublish" })
    actions.push({ label: "Archive", action: "archive" })
  }

  if (post.status === "archived") {
    actions.push({ label: "Restore", action: "restore" })
  }

  actions.push({ label: "Delete", action: "delete", variant: "destructive" })

  return actions
}

export function getPostBulkActions(): Array<{
  label: string
  action: string
  variant?: "default" | "destructive"
}> {
  return [
    { label: "Publish", action: "bulkPublish" },
    { label: "Schedule...", action: "bulkSchedule" },
    { label: "Set Category", action: "bulkSetCategory" },
    { label: "Add Tag", action: "bulkAddTag" },
    { label: "Delete", action: "bulkDelete", variant: "destructive" },
  ]
}
