/**
 * Lead Routing & Assignment
 * 
 * Routing rules for leads based on priority.
 * P0 → senior advisor + instant notification
 * P1 → normal queue + SLA 24h
 * P2 → nurture automation
 */

import type { LeadNormalized, LeadPriority } from "./lead.schema";
import { calculateLeadPriority } from "./scoring";

/**
 * Get default owner ID by priority
 * In production, this would query a user/advisor database
 */
function getDefaultOwnerId(priority: LeadPriority): string | undefined {
  // P0 → senior advisor (hardcoded for MVP, should be configurable)
  if (priority === "P0") {
    return "senior-advisor-1"; // TODO: Replace with actual user ID from DB
  }
  // P1/P2 → auto-assign or leave unassigned
  return undefined;
}

/**
 * Calculate SLA due date
 */
function calculateSLADueAt(priority: LeadPriority): string {
  const now = new Date();
  let hoursToAdd = 72; // Default: 72 hours (3 days)

  switch (priority) {
    case "P0":
      hoursToAdd = 2; // 2 hours for critical
      break;
    case "P1":
      hoursToAdd = 24; // 24 hours for high priority
      break;
    case "P2":
      hoursToAdd = 72; // 72 hours for normal
      break;
  }

  const dueDate = new Date(now.getTime() + hoursToAdd * 60 * 60 * 1000);
  return dueDate.toISOString();
}

/**
 * Route and assign lead
 */
export function routeAndAssignLead(lead: LeadNormalized): {
  priority: LeadPriority;
  ownerId?: string;
  slaDueAt: string;
  status: "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";
} {
  // Calculate priority if not set
  const priority = lead.priority || calculateLeadPriority(lead);

  // Get owner ID based on priority
  const ownerId = getDefaultOwnerId(priority);

  // Calculate SLA due date
  const slaDueAt = calculateSLADueAt(priority);

  // Set initial status
  const status: "new" | "contacted" | "qualified" | "proposal" | "won" | "lost" = "new";

  return {
    priority,
    ownerId,
    slaDueAt,
    status,
  };
}

/**
 * Notify lead assignment (template)
 * In production, integrate with Slack/email/PagerDuty
 */
export function notifyLeadAssignment(lead: LeadNormalized, priority: LeadPriority): void {
  if (priority === "P0") {
    // Instant notification for P0
    console.log(`[Lead Routing] P0 Lead: ${lead.id} - Instant notification to Senior Advisor!`);
    // TODO: Send Slack/email notification
    // Example:
    // slack.sendMessage(`🚨 P0 Lead: ${lead.contact.fullName} - ${lead.contact.email}`);
  } else if (priority === "P1") {
    console.log(`[Lead Routing] P1 Lead: ${lead.id} - Added to normal queue, SLA 24h.`);
    // TODO: Add to CRM normal queue
  } else {
    console.log(`[Lead Routing] P2 Lead: ${lead.id} - Nurture automation triggered.`);
    // TODO: Trigger email nurture sequence
  }
}
