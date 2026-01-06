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
 * Sanitize string: remove dangerous characters and trim
 */
function sanitizeString(value: string): string {
  // Remove HTML tags, script tags, and dangerous characters
  return value
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, "") // Remove event handlers
    .trim();
}

/**
 * Contact Schema
 */
export const ContactSchema = z.object({
  fullName: z
    .string()
    .min(2, "Họ tên cần ít nhất 2 ký tự")
    .max(100, "Họ tên không được vượt quá 100 ký tự")
    .transform(sanitizeString),
  email: z
    .string()
    .email("Email không hợp lệ")
    .max(255, "Email không được vượt quá 255 ký tự")
    .transform((val) => val.toLowerCase().trim()),
  phone: z
    .string()
    .max(20, "Số điện thoại không được vượt quá 20 ký tự")
    .optional()
    .transform((val) => val ? sanitizeString(val) : undefined),
});

/**
 * Company Schema
 */
export const CompanySchema = z.object({
  name: z
    .string()
    .max(200, "Tên công ty không được vượt quá 200 ký tự")
    .optional()
    .transform((val) => val ? sanitizeString(val) : undefined),
  industry: z
    .string()
    .max(100, "Ngành nghề không được vượt quá 100 ký tự")
    .optional()
    .transform((val) => val ? sanitizeString(val) : undefined),
  size: z
    .string()
    .max(50, "Quy mô không được vượt quá 50 ký tự")
    .optional()
    .transform((val) => val ? sanitizeString(val) : undefined),
  revenueRange: z
    .string()
    .max(50, "Doanh thu không được vượt quá 50 ký tự")
    .optional()
    .transform((val) => val ? sanitizeString(val) : undefined),
  yearsActive: z
    .string()
    .max(50, "Năm hoạt động không được vượt quá 50 ký tự")
    .optional()
    .transform((val) => val ? sanitizeString(val) : undefined),
});

/**
 * Intent Schema
 */
export const IntentSchema = z.object({
  serviceSlugs: z.array(z.string().max(50)).optional(),
  message: z
    .string()
    .max(5000, "Tin nhắn không được vượt quá 5000 ký tự")
    .optional()
    .transform((val) => val ? sanitizeString(val) : undefined),
  painPoints: z.array(z.string().max(200)).optional(),
  goals: z.array(z.string().max(200)).optional(),
  // Phase 6: OneLedger-specific fields
  persona: z.string().max(50).optional(),
  triggerEvents: z.array(z.string().max(50)).optional(),
  priorities: z.array(z.string().max(200)).optional(),
  moduleIds: z.array(z.string().max(10)).optional(),
  gateId: z.string().max(10).optional(),
  bundleId: z.string().max(50).optional(),
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
  // Phase 6: Experiment variants
  experiments: z.record(z.string()).optional(),
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
 * SLA Schema
 */
export const SLASchema = z.object({
  dueAt: z.string().optional(), // ISO timestamp
  assignedAt: z.string().optional(),
  contactedAt: z.string().optional(),
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
  // Phase 8: Extended status enum
  status: z.enum(["new", "contacted", "qualified", "proposal", "won", "lost"]).optional(),
  notes: z
    .string()
    .max(10000, "Ghi chú không được vượt quá 10000 ký tự")
    .optional()
    .transform((val) => val ? sanitizeString(val) : undefined),
  // Phase 6: Lead priority (calculated, not from payload)
  priority: z.enum(["P0", "P1", "P2"]).optional(),
  // Phase 8: Pipeline fields
  ownerId: z.string().optional(), // Assigned advisor/owner ID
  sla: SLASchema.optional(),
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
export type SLA = z.infer<typeof SLASchema>;
export type LeadNormalized = z.infer<typeof LeadNormalizedSchema>;

