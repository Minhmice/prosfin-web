/**
 * Lead Repository
 * 
 * Data access layer for leads.
 * Handles deduplication queries and unique index logic.
 * 
 * Note: This is a template/interface. In production, implement with actual DB (Prisma/Postgres/etc).
 */

import type { LeadNormalized, LeadSource } from "./lead.types";

/**
 * Deduplication window (days)
 */
const DEDUPE_WINDOW_DAYS = 30;

/**
 * Find duplicate lead
 * 
 * Dedupe rules:
 * - email + company + source within T days
 * - phone optional (if provided, also check phone)
 */
export async function findDuplicateLead(
  email: string,
  company: string | undefined,
  source: LeadSource,
  phone?: string
): Promise<LeadNormalized | null> {
  // TODO: Implement with actual database query
  // Example Prisma query:
  // const duplicate = await prisma.lead.findFirst({
  //   where: {
  //     email: email.toLowerCase(),
  //     company: company || null,
  //     source,
  //     createdAt: {
  //       gte: new Date(Date.now() - DEDUPE_WINDOW_DAYS * 24 * 60 * 60 * 1000),
  //     },
  //     ...(phone && {
  //       OR: [
  //         { phone },
  //         { phone: null }, // Also match if phone not provided
  //       ],
  //     }),
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });

  // For now, return null (no duplicate found)
  // In production, implement actual DB query
  return null;
}

/**
 * Find lead by idempotency key (clientRequestId)
 */
export async function findLeadByIdempotencyKey(
  clientRequestId: string
): Promise<LeadNormalized | null> {
  // TODO: Implement with actual database query
  // Example:
  // const lead = await prisma.lead.findFirst({
  //   where: {
  //     meta: {
  //       path: ["extras", "clientRequestId"],
  //       equals: clientRequestId,
  //     },
  //   },
  // });

  // For now, return null
  return null;
}

/**
 * Save lead
 * 
 * Note: In production, ensure unique index on:
 * - (email, company, source, createdAt) for dedupe
 * - (meta.extras.clientRequestId) for idempotency (if using JSONB)
 */
export async function saveLead(lead: LeadNormalized): Promise<LeadNormalized> {
  // TODO: Implement with actual database save
  // Example:
  // const saved = await prisma.lead.create({
  //   data: lead,
  // });
  // return saved;

  // For now, return as-is
  return lead;
}

/**
 * Get unique index definition (for migration/documentation)
 */
export function getUniqueIndexDefinitions(): Array<{
  name: string;
  fields: string[];
  description: string;
}> {
  return [
    {
      name: "idx_lead_dedupe",
      fields: ["email", "company", "source"],
      description: "Deduplication index: email + company + source within T days",
    },
    {
      name: "idx_lead_idempotency",
      fields: ["meta.extras.clientRequestId"],
      description: "Idempotency index: prevent duplicate submissions from retries",
    },
  ];
}

