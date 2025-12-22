/**
 * Client Types
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
  updatedAt: Date
}

