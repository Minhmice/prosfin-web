/**
 * Lead Cleanup
 * 
 * Retention job để auto delete raw PII after N days nếu không convert.
 * 
 * Note: This is a template. In production, implement as cron job or scheduled task.
 */

import type { LeadNormalized } from "./lead.types";

/**
 * Retention period (days)
 * Auto delete leads that:
 * - Are not converted
 * - Are older than RETENTION_DAYS
 */
const RETENTION_DAYS = 90; // 90 days default

/**
 * Find leads eligible for deletion
 * 
 * Criteria:
 * - status !== "converted"
 * - createdAt < (now - RETENTION_DAYS)
 */
export async function findLeadsForDeletion(): Promise<LeadNormalized[]> {
  // TODO: Implement with actual database query
  // Example:
  // const cutoffDate = new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000);
  // const leads = await prisma.lead.findMany({
  //   where: {
  //     status: {
  //       not: "converted",
  //     },
  //     createdAt: {
  //       lt: cutoffDate,
  //     },
  //   },
  // });
  // return leads;

  // For now, return empty array
  return [];
}

/**
 * Delete lead (soft delete or hard delete)
 * 
 * Note: Consider soft delete (mark as deleted) instead of hard delete for audit trail.
 */
export async function deleteLead(leadId: string): Promise<void> {
  // TODO: Implement with actual database delete
  // Example soft delete:
  // await prisma.lead.update({
  //   where: { id: leadId },
  //   data: { deletedAt: new Date() },
  // });

  // Example hard delete:
  // await prisma.lead.delete({
  //   where: { id: leadId },
  // });
}

/**
 * Run cleanup job
 * 
 * This should be called by a cron job or scheduled task.
 */
export async function runCleanupJob(): Promise<{
  deleted: number;
  errors: number;
}> {
  const leads = await findLeadsForDeletion();
  let deleted = 0;
  let errors = 0;

  for (const lead of leads) {
    try {
      await deleteLead(lead.id);
      deleted++;
    } catch (error) {
      console.error(`[LeadCleanup] Error deleting lead ${lead.id}:`, error);
      errors++;
    }
  }

  return { deleted, errors };
}

/**
 * Get cleanup job stats
 */
export async function getCleanupStats(): Promise<{
  eligibleForDeletion: number;
  retentionDays: number;
}> {
  const leads = await findLeadsForDeletion();
  return {
    eligibleForDeletion: leads.length,
    retentionDays: RETENTION_DAYS,
  };
}

