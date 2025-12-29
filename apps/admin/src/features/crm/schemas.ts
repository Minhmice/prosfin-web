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
  tags: z.array(z.string()),
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
  status: z.enum(["new", "contacted", "qualified", "converted", "archived"]),
  source: z.enum(["website", "referral", "social", "other"]),
  ownerId: z.string().optional(),
  ownerName: z.string().optional(),
})

export const leadListQuerySchema = z.object({
  q: z.string().optional(),
  status: z.enum(["new", "contacted", "qualified", "converted", "archived"]).optional(),
  source: z.enum(["website", "referral", "social", "other"]).optional(),
  owner: z.string().optional(),
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
