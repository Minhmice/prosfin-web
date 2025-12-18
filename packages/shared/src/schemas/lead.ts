/**
 * Lead Schemas
 */

import { z } from "zod"
import { LEAD_STATUSES, LEAD_SOURCES } from "../constants"

export const leadStatusSchema = z.enum(LEAD_STATUSES)
export const leadSourceSchema = z.enum(LEAD_SOURCES)

export const createLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  interest: z.string().optional(),
  status: leadStatusSchema.default("new"),
  source: leadSourceSchema,
  ownerId: z.string().optional(),
  utmCampaign: z.string().optional(),
})

export const updateLeadSchema = createLeadSchema.partial()

export const leadFilterSchema = z.object({
  q: z.string().optional(),
  status: leadStatusSchema.optional(),
  source: leadSourceSchema.optional(),
  ownerId: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
  sort: z.string().optional(),
})

export const leadAttributionSchema = z.object({
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
  referrer: z.string().optional(),
  landingPath: z.string().optional(),
  userAgent: z.string().optional(),
})

export const createLeadWithAttributionSchema = createLeadSchema.extend({
  attribution: leadAttributionSchema.optional(),
})

export type CreateLeadInput = z.infer<typeof createLeadSchema>
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>
export type LeadFilterInput = z.infer<typeof leadFilterSchema>
export type LeadAttributionInput = z.infer<typeof leadAttributionSchema>
export type CreateLeadWithAttributionInput = z.infer<typeof createLeadWithAttributionSchema>

