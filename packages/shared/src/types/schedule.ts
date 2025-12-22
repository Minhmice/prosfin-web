/**
 * Schedule Types
 */

export type ScheduleStatus = "queued" | "sent" | "cancelled"

export interface ScheduleItem {
  id: string
  postId: string
  scheduledAt: Date
  status: ScheduleStatus
  channel?: string
}

