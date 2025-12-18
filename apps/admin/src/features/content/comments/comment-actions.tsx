"use client"

import type { Comment } from "../../types"

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

  if (comment.status === "pending") {
    actions.push({ label: "Approve", action: "approve" })
    actions.push({ label: "Reject", action: "reject", variant: "destructive" })
    actions.push({ label: "Mark as Spam", action: "spam" })
  }

  if (comment.status === "approved") {
    actions.push({ label: "Reject", action: "reject", variant: "destructive" })
    actions.push({ label: "Mark as Spam", action: "spam" })
  }

  if (comment.status === "spam" || comment.status === "trashed") {
    actions.push({ label: "Restore", action: "restore" })
  }

  if (comment.status !== "trashed") {
    actions.push({ label: "Delete", action: "delete", variant: "destructive" })
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
    { label: "Reject", action: "bulkReject", variant: "destructive" },
    { label: "Mark as Spam", action: "bulkSpam" },
    { label: "Delete", action: "bulkDelete", variant: "destructive" },
  ]
}
