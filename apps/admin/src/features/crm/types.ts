/**
 * CRM Types
 * Extended types for Client and Lead
 */

export type ClientStatus = "active" | "inactive" | "archived"

export interface Client {
  id: string
  name: string
  company: string
  email: string
  phone?: string
  status: ClientStatus
  ownerId?: string
  ownerName?: string
  tags: string[]
  lastContactedAt?: Date
  createdAt: Date
}

export type LeadStage = "new" | "qualified" | "proposal" | "won" | "lost"
export type LeadSource = "web" | "referral" | "event" | "other"

export interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone?: string
  stage: LeadStage
  source: LeadSource
  score: number
  ownerId?: string
  ownerName?: string
  nextActionAt?: Date
  createdAt: Date
  updatedAt: Date
}
