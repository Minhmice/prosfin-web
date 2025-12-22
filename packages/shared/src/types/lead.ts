/**
 * Lead Types
 */

export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "archived"
export type LeadSource = "website" | "referral" | "social" | "other"

export interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone?: string
  interest?: string
  status: LeadStatus
  source: LeadSource
  ownerId?: string
  ownerName?: string
  utmCampaign?: string
  createdAt: Date
  updatedAt: Date
}

export interface LeadAttribution {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
  referrer?: string
  landingPath?: string
  userAgent?: string
}

