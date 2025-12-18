export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "archived"
export type LeadSource = "website" | "referral" | "social" | "other"

export interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone?: string
  interest: string
  status: LeadStatus
  source: LeadSource
  utmCampaign?: string
  createdAt: Date
  updatedAt: Date
}

export type ClientStatus = "active" | "inactive" | "archived"

export interface Client {
  id: string
  name: string
  company: string
  email: string
  status: ClientStatus
  owner?: string
  createdAt: Date
}

export type PostStatus = "draft" | "published" | "archived"

export interface Post {
  id: string
  title: string
  slug: string
  status: PostStatus
  updatedAt: Date
  publishedAt?: Date
}

export type TagStatus = "active" | "archived"

export interface Tag {
  id: string
  name: string
  slug: string
  status: TagStatus
  updatedAt: Date
  postCount?: number
}
