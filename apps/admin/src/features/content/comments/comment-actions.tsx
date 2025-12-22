"use client"

import type { Comment } from "../types"

export function getCommentRowActions(comment: Comment): Array<{
  label: string
  action: string
  variant?: "default" | "destructive"
}> {
  const actions: Array<{
    label: string
    action: string
    variant?: "default" | "destructive"
  }> = []

  actions.push({ label: "Reply", action: "reply" })
  actions.push({ label: "Open Comments", action: "openComments" })

  if (comment.status === "pending") {
    actions.push({ label: "Approve", action: "approve" })
    actions.push({ label: "Hide", action: "hide" })
    actions.push({ label: "Mark as Spam", action: "spam" })
  }

  if (comment.status === "approved") {
    actions.push({ label: "Hide", action: "hide" })
    actions.push({ label: "Mark as Spam", action: "spam" })
  }

  if (comment.status === "spam" || comment.status === "trash") {
    actions.push({ label: "Restore", action: "restore" })
  }

  return actions
}

export function getCommentBulkActions(): Array<{
  label: string
  action: string
  variant?: "default" | "destructive"
}> {
  return [
    { label: "Approve", action: "bulkApprove" },
    { label: "Hide", action: "bulkHide" },
    { label: "Mark as Spam", action: "bulkSpam" },
  ]
}
