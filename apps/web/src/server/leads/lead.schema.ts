/**
 * Lead Schema
 * 
 * Single source of truth for lead validation (server-side).
 * Zod schema cho LeadNormalized.
 */

import { z } from "zod";

/**
 * Lead Source Enum
 */
export const LeadSourceSchema = z.enum([
  "hero_modal",
  "hero_modal_full",
  "contact_page",
  "contact_lite",
  "cleardata_lp",
  "onboarding_step2",
  "service_cta",
  "tool_lead_magnet",
]);

/**
 * Contact Schema
 */
export const ContactSchema = z.object({
  fullName: z.string().min(2, "Họ tên cần ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().optional(),
});

/**
 * Company Schema
 */
export const CompanySchema = z.object({
  name: z.string().optional(),
  industry: z.string().optional(),
  size: z.string().optional(),
  revenueRange: z.string().optional(),
  yearsActive: z.string().optional(),
});

/**
 * Intent Schema
 */
export const IntentSchema = z.object({
  serviceSlugs: z.array(z.string()).optional(),
  message: z.string().optional(),
  painPoints: z.array(z.string()).optional(),
  goals: z.array(z.string()).optional(),
});

/**
 * Attribution Schema
 */
export const AttributionSchema = z.object({
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
  referrer: z.string().optional(),
  landingPath: z.string().optional(),
  firstTouchAt: z.string().optional(),
  lastTouchAt: z.string().optional(),
});

/**
 * Meta Schema
 */
export const MetaSchema = z.object({
  userAgent: z.string().optional(),
  ip: z.string().optional(),
  ipHash: z.string().optional(),
  locale: z.string().optional(),
  pagePath: z.string().optional(),
  sessionDraftId: z.string().optional(),
});

/**
 * Consent Schema
 */
export const ConsentSchema = z.object({
  marketing: z.boolean().optional(),
  privacyAccepted: z.boolean().default(true),
  timestamp: z.string(),
});

/**
 * Lead Normalized Schema
 * 
 * Single source of truth cho lead data contract.
 */
export const LeadNormalizedSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string(),
  source: LeadSourceSchema,
  contact: ContactSchema,
  company: CompanySchema.optional(),
  intent: IntentSchema.optional(),
  attribution: AttributionSchema.optional(),
  meta: MetaSchema.optional(),
  consent: ConsentSchema,
  duplicateOf: z.string().uuid().optional(),
  status: z.enum(["new", "contacted", "qualified", "converted"]).optional(),
  notes: z.string().optional(),
});

/**
 * Type exports
 */
export type LeadSource = z.infer<typeof LeadSourceSchema>;
export type Contact = z.infer<typeof ContactSchema>;
export type Company = z.infer<typeof CompanySchema>;
export type Intent = z.infer<typeof IntentSchema>;
export type Attribution = z.infer<typeof AttributionSchema>;
export type Meta = z.infer<typeof MetaSchema>;
export type Consent = z.infer<typeof ConsentSchema>;
export type LeadNormalized = z.infer<typeof LeadNormalizedSchema>;

