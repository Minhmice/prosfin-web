/**
 * Activity Events System
 * Event emitter/listener for tracking content and CRM activities
 */

export type ActivityEventType =
  | "post_created"
  | "post_published"
  | "post_scheduled"
  | "post_updated"
  | "media_uploaded"
  | "comment_approved"
  | "comment_rejected"
  | "lead_created"
  | "client_created"
  | "lead_converted"

export type ActivityEntity = "post" | "media" | "comment" | "lead" | "client"

export interface ActivityEvent {
  type: ActivityEventType
  entity: ActivityEntity
  entityId: string
  title: string
  timestamp: Date
  actor: string
}

type ActivityListener = (event: ActivityEvent) => void

class ActivityEventEmitter {
  private listeners: ActivityListener[] = []

  subscribe(listener: ActivityListener) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  emit(event: ActivityEvent) {
    this.listeners.forEach((listener) => listener(event))
  }
}

export const activityEvents = new ActivityEventEmitter()

/**
 * Helper functions to emit activity events
 */
export const emitActivity = {
  postCreated: (postId: string, title: string, actor: string) => {
    activityEvents.emit({
      type: "post_created",
      entity: "post",
      entityId: postId,
      title: `Post "${title}" created`,
      timestamp: new Date(),
      actor,
    })
  },

  postPublished: (postId: string, title: string, actor: string) => {
    activityEvents.emit({
      type: "post_published",
      entity: "post",
      entityId: postId,
      title: `Post "${title}" published`,
      timestamp: new Date(),
      actor,
    })
  },

  postScheduled: (postId: string, title: string, actor: string) => {
    activityEvents.emit({
      type: "post_scheduled",
      entity: "post",
      entityId: postId,
      title: `Post "${title}" scheduled`,
      timestamp: new Date(),
      actor,
    })
  },

  mediaUploaded: (mediaId: string, name: string, actor: string) => {
    activityEvents.emit({
      type: "media_uploaded",
      entity: "media",
      entityId: mediaId,
      title: `Media "${name}" uploaded`,
      timestamp: new Date(),
      actor,
    })
  },

  commentApproved: (commentId: string, actor: string) => {
    activityEvents.emit({
      type: "comment_approved",
      entity: "comment",
      entityId: commentId,
      title: "Comment approved",
      timestamp: new Date(),
      actor,
    })
  },

  leadCreated: (leadId: string, name: string, actor: string) => {
    activityEvents.emit({
      type: "lead_created",
      entity: "lead",
      entityId: leadId,
      title: `Lead "${name}" created`,
      timestamp: new Date(),
      actor,
    })
  },

  clientCreated: (clientId: string, name: string, actor: string) => {
    activityEvents.emit({
      type: "client_created",
      entity: "client",
      entityId: clientId,
      title: `Client "${name}" created`,
      timestamp: new Date(),
      actor,
    })
  },
}
