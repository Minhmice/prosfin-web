/**
 * CRM Zod Schemas
 * Form validation schemas for Client and Lead
 */

import { z } from "zod"

export const clientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  status: z.enum(["active", "inactive", "archived"]),
  ownerId: z.string().optional(),
  ownerName: z.string().optional(),
  tags: z.array(z.string()).default([]),
  lastContactedAt: z.date().optional(),
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

export type LeadFormData = z.infer<typeof leadSchema>

export const convertLeadSchema = clientSchema.extend({
  // Additional fields when converting lead to client
  convertedFromLeadId: z.string().optional(),
})

export type ConvertLeadFormData = z.infer<typeof convertLeadSchema>
