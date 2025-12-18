/**
 * Status Constants
 */

export const CLIENT_STATUSES = ["active", "inactive", "archived"] as const
export const LEAD_STATUSES = ["new", "contacted", "qualified", "converted", "archived"] as const
export const POST_STATUSES = ["draft", "scheduled", "published", "archived"] as const
export const COMMENT_STATUSES = ["pending", "approved", "spam", "trashed"] as const
export const SCHEDULE_STATUSES = ["queued", "sent", "cancelled"] as const

