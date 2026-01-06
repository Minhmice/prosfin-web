/**
 * Notification Service
 * 
 * Notifications for gate submissions, approvals, SLA overdue.
 */

import type { Engagement } from "./engagement.schema";
import type { GateInstance } from "./gate-instance.schema";
import type { Artifact } from "./artifact.schema";

/**
 * Notification Channel
 */
export type NotificationChannel = "email" | "slack" | "internal";

/**
 * Notification Template
 */
export interface NotificationTemplate {
  id: string;
  channel: NotificationChannel;
  subject?: string;
  body: string;
  variables: string[];
}

/**
 * Notification Templates
 */
const templates: Record<string, NotificationTemplate> = {
  gate_submitted: {
    id: "gate_submitted",
    channel: "email",
    subject: "Gate {{gateId}} đã được submit - Cần review",
    body: "Gate {{gateId}} của engagement {{engagementId}} đã được client submit. Vui lòng review trong vòng {{slaHours}} giờ.",
    variables: ["gateId", "engagementId", "slaHours"],
  },
  gate_blocked: {
    id: "gate_blocked",
    channel: "email",
    subject: "Gate {{gateId}} cần thêm thông tin",
    body: "Gate {{gateId}} của bạn cần bổ sung thông tin: {{note}}. Vui lòng cập nhật và submit lại.",
    variables: ["gateId", "note"],
  },
  gate_approved: {
    id: "gate_approved",
    channel: "email",
    subject: "Gate {{gateId}} đã được approve",
    body: "Gate {{gateId}} của bạn đã được approve. Bạn có thể tiếp tục với gate tiếp theo.",
    variables: ["gateId"],
  },
  artifact_published: {
    id: "artifact_published",
    channel: "email",
    subject: "Deliverable mới: {{artifactTitle}}",
    body: "Deliverable {{artifactTitle}} ({{version}}) đã được publish. Bạn có thể tải về tại: {{downloadUrl}}",
    variables: ["artifactTitle", "version", "downloadUrl"],
  },
  sla_overdue: {
    id: "sla_overdue",
    channel: "slack",
    subject: "SLA Overdue: Engagement {{engagementId}}",
    body: "⚠️ Engagement {{engagementId}} có gate đã quá hạn SLA. Gate: {{gateId}}, Due: {{dueAt}}",
    variables: ["engagementId", "gateId", "dueAt"],
  },
};

/**
 * Send notification
 */
export async function sendNotification(
  templateId: string,
  recipient: string,
  variables: Record<string, string>,
  channel?: NotificationChannel
): Promise<void> {
  const template = templates[templateId];
  if (!template) {
    console.error(`[Notification] Template not found: ${templateId}`);
    return;
  }

  const effectiveChannel = channel || template.channel;

  // Replace variables in subject and body
  let subject = template.subject || "";
  let body = template.body;

  Object.entries(variables).forEach(([key, value]) => {
    subject = subject.replace(`{{${key}}}`, value);
    body = body.replace(`{{${key}}}`, value);
  });

  // TODO: Send notification via actual channel
  // Example:
  // if (effectiveChannel === "email") {
  //   await sendEmail(recipient, subject, body);
  // } else if (effectiveChannel === "slack") {
  //   await sendSlackMessage(recipient, body);
  // }

  // For now, log notification
  console.log(`[Notification] ${effectiveChannel} to ${recipient}:`, { subject, body });
}

/**
 * Notify gate submitted
 */
export async function notifyGateSubmitted(
  gateInstance: GateInstance,
  engagement: Engagement
): Promise<void> {
  if (!engagement.ownerId) return;

  // Calculate SLA hours (default: 24 hours for P1, 2 hours for P0)
  const slaHours = engagement.metadata?.triggerEvents?.includes("mna") ? 2 : 24;

  await sendNotification(
    "gate_submitted",
    engagement.ownerId,
    {
      gateId: gateInstance.gateId,
      engagementId: engagement.id,
      slaHours: slaHours.toString(),
    },
    "email"
  );
}

/**
 * Notify gate blocked
 */
export async function notifyGateBlocked(
  gateInstance: GateInstance,
  clientEmail: string,
  note: string
): Promise<void> {
  await sendNotification(
    "gate_blocked",
    clientEmail,
    {
      gateId: gateInstance.gateId,
      note,
    },
    "email"
  );
}

/**
 * Notify gate approved
 */
export async function notifyGateApproved(
  gateInstance: GateInstance,
  clientEmail: string
): Promise<void> {
  await sendNotification(
    "gate_approved",
    clientEmail,
    {
      gateId: gateInstance.gateId,
    },
    "email"
  );
}

/**
 * Notify artifact published
 */
export async function notifyArtifactPublished(
  artifact: Artifact,
  clientEmail: string
): Promise<void> {
  await sendNotification(
    "artifact_published",
    clientEmail,
    {
      artifactTitle: artifact.title,
      version: artifact.version,
      downloadUrl: `/api/artifacts/download?artifactId=${artifact.id}`,
    },
    "email"
  );
}

/**
 * Notify SLA overdue
 */
export async function notifySLAOverdue(
  engagement: Engagement,
  gateInstance: GateInstance
): Promise<void> {
  if (!engagement.ownerId) return;

  await sendNotification(
    "sla_overdue",
    engagement.ownerId,
    {
      engagementId: engagement.id,
      gateId: gateInstance.gateId,
      dueAt: gateInstance.submittedAt || "N/A",
    },
    "slack"
  );
}

