import * as z from "zod";

export const personaSchema = z.enum(["owner", "cfo", "chief-accountant", "finance-team"]);

export const triggerEventSchema = z.enum([
  "expansion",
  "bank_loan",
  "fundraising",
  "restructuring",
  "succession",
  "mna",
  "compliance_pressure",
]);

export const leadSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  persona: personaSchema,
  revenueRange: z.enum(["<10B", "10-30B", "30-100B", "100-300B", "300B+"]).optional(),
  triggerEvents: z.array(triggerEventSchema).default([]),
  priorities: z.array(z.enum(["oss", "compliance", "reporting", "controls", "org", "tech"])).default([]),
  scan: z
    .object({
      selectedQuestionIds: z.array(z.string()).default([]),
      score: z.number().min(0).max(100).optional(),
      riskLevel: z.enum(["low", "medium", "high", "critical"]).optional(),
      topRisks: z.array(z.string()).default([]),
      recommendedModuleIds: z.array(z.string()).default([]),
      recommendedGateId: z.string().optional(),
    })
    .optional(),
  source: z.string().default("oneledger"),
  sourceDetail: z.string().optional(),
  pagePath: z.string().optional(),
  referrer: z.string().optional(),
  utm: z
    .object({
      source: z.string().optional(),
      medium: z.string().optional(),
      campaign: z.string().optional(),
      content: z.string().optional(),
      term: z.string().optional(),
    })
    .optional(),
  notes: z.string().max(2000).optional(),
});

export type LeadPayload = z.infer<typeof leadSchema>;

