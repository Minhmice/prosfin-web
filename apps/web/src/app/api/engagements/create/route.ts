/**
 * Create Engagement Endpoint
 * 
 * POST /api/engagements/create
 * 
 * Admin action: Create engagement from qualified lead.
 * Idempotent: 1 lead → 1 engagement (unless duplicate override).
 */

import { NextRequest, NextResponse } from "next/server";
import { getLeadById } from "@/server/leads/lead.service";
import { createEngagementFromLead, getEngagementByLeadId } from "@/server/delivery/engagement.service";
import { createAuditEvent } from "@/server/delivery/audit.service";

/**
 * POST /api/engagements/create
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadId, ownerId, overrideDuplicate } = body;

    if (!leadId) {
      return NextResponse.json(
        { error: "Missing leadId" },
        { status: 400 }
      );
    }

    // Get lead
    // TODO: Implement getLeadById in lead.service
    // const lead = await getLeadById(leadId);
    // if (!lead) {
    //   return NextResponse.json(
    //     { error: "Lead not found" },
    //     { status: 404 }
    //   );
    // }

    // Check if lead is qualified
    // if (lead.status !== "qualified") {
    //   return NextResponse.json(
    //     { error: "Lead must be qualified to create engagement" },
    //     { status: 400 }
    //   );
    // }

    // Check for existing engagement (idempotency)
    // const existingEngagement = await getEngagementByLeadId(leadId);
    // if (existingEngagement && !overrideDuplicate) {
    //   return NextResponse.json(
    //     {
    //       error: "Engagement already exists for this lead",
    //       engagementId: existingEngagement.id,
    //     },
    //     { status: 409 }
    //   );
    // }

    // Create engagement
    // const result = await createEngagementFromLead(lead, ownerId);

    // Create audit event
    // await createAuditEvent({
    //   engagementId: result.engagement.id,
    //   actor: "internal_user",
    //   actorId: ownerId || "system",
    //   action: "engagement_created",
    //   payload: {
    //     leadId,
    //     engagementId: result.engagement.id,
    //   },
    // });

    // For now, return placeholder
    return NextResponse.json({
      success: true,
      message: "Engagement creation endpoint ready (implement with actual DB)",
      // engagement: result.engagement,
      // gateInstances: result.gateInstances,
      // tasks: result.tasks,
      // artifacts: result.artifacts,
    });
  } catch (error) {
    console.error("[Create Engagement] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

