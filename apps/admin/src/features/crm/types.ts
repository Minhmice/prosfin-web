/**
 * CRM Types
 * Extended types for Client and Lead
 */

import type { Lead } from "@prosfin/shared"

export type ClientStatus = "active" | "inactive" | "archived"

export interface Client {
  id: string
  name: string
  company: string
  title?: string
  email: string
  phone?: string
  status: ClientStatus
  ownerId?: string
  ownerName?: string
  tags: string[]
  lastContactedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Note {
  id: string
  clientId: string
  content: string
  authorId: string
  authorName: string
  createdAt: Date
  updatedAt: Date
}

export interface Task {
  id: string
  clientId: string
  title: string
  description?: string
  status: "todo" | "in_progress" | "completed"
  dueDate?: Date
  assignedToId?: string
  assignedToName?: string
  createdAt: Date
  updatedAt: Date
}

export interface File {
  id: string
  clientId: string
  name: string
  url: string
  size: number
  mimeType: string
  uploadedBy: string
  uploadedByName: string
  createdAt: Date
}

export interface Client360 {
  client: Client
  relatedLeads: Lead[]
  notes: Note[]
  tasks: Task[]
  files: File[]
}

// Lead type is now imported from @prosfin/shared
// Legacy types kept for backward compatibility if needed
export type LeadStage = "new" | "qualified" | "proposal" | "won" | "lost"
export type LeadSource = "web" | "referral" | "event" | "other"

export interface LeadSourceSeries {
  points: Array<{
    date: string
    [source: string]: number | string
  }>
}
