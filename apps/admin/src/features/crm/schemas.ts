/**
 * CRM Zod Schemas
 * Form validation schemas for Client and Lead
 */

import { z } from "zod"

export const clientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  title: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  status: z.enum(["active", "inactive", "archived"]),
  ownerId: z.string().optional(),
  ownerName: z.string().optional(),
  tags: z.array(z.string()).default([]),
  lastContactedAt: z.date().optional(),
})

export const clientListQuerySchema = z.object({
  q: z.string().optional(),
  status: z.enum(["active", "inactive", "archived"]).optional(),
  owner: z.string().optional(),
  tags: z.union([
    z.array(z.string()),
    z.string().transform((val) => [val]),
  ]).optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
  sort: z.string().optional(), // format: "-updatedAt" or "name.asc"
})

export type ClientFormData = z.infer<typeof clientSchema>

export const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  stage: z.enum(["new", "qualified", "proposal", "won", "lost"]),
  source: z.enum(["web", "referral", "event", "other"]),
  score: z.number().min(0).max(100).default(0),
  ownerId: z.string().optional(),
  ownerName: z.string().optional(),
  nextActionAt: z.date().optional(),
})

export const leadListQuerySchema = z.object({
  q: z.string().optional(),
  stage: z.enum(["new", "qualified", "proposal", "won", "lost"]).optional(),
  source: z.enum(["web", "referral", "event", "other"]).optional(),
  owner: z.string().optional(),
  scoreMin: z.coerce.number().int().min(0).max(100).optional(),
  scoreMax: z.coerce.number().int().min(0).max(100).optional(),
  dateFrom: z.string().optional(), // ISO date string
  dateTo: z.string().optional(), // ISO date string
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
  sort: z.string().optional(), // format: "-updatedAt" or "name.asc"
})

export type LeadFormData = z.infer<typeof leadSchema>
export type LeadListQuery = z.infer<typeof leadListQuerySchema>

export const convertLeadSchema = clientSchema.extend({
  // Additional fields when converting lead to client
  convertedFromLeadId: z.string().optional(),
})

export type ConvertLeadFormData = z.infer<typeof convertLeadSchema>
