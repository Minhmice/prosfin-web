/**
 * Client Portal v1
 * 
 * /onboarding/oneledger/[token]
 * 
 * Production-grade client portal with tabs:
 * - Overview
 * - Gates Timeline
 * - Upload Center
 * - Q&A / Messages
 * - Deliverables Vault
 */

import { notFound } from "next/navigation";
import { verifyOnboardingToken } from "@/server/onboarding/token";
import { getDataRequestListForMultiple } from "@/content/services/oneledger/data-request-list";
import { getEngagementByLeadId } from "@/server/delivery/engagement.service";
import { getGateInstancesByEngagementId } from "@/server/delivery/gate.service";
import { getArtifactsByEngagementId } from "@/server/delivery/artifact.service";
import { ClientPortalTabs } from "@/features/delivery/client-portal-tabs";
import type { LeadNormalized } from "@/server/leads/lead.schema";

/**
 * Get lead by ID (template - implement with actual DB query)
 */
async function getLeadById(leadId: string): Promise<LeadNormalized | null> {
  // TODO: Implement with actual database query
  return null;
}

/**
 * Client Portal Page
 */
export default async function ClientPortalPage({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;

  // Verify token
  const tokenResult = verifyOnboardingToken(token);
  if (!tokenResult.valid || !tokenResult.leadId) {
    notFound();
  }

  // Get lead
  const lead = await getLeadById(tokenResult.leadId);
  if (!lead) {
    notFound();
  }

  // Get engagement (if exists)
  const engagement = await getEngagementByLeadId(lead.id);
  
  // Get gate instances (if engagement exists)
  const gateInstances = engagement
    ? await getGateInstancesByEngagementId(engagement.id)
    : [];

  // Get artifacts (if engagement exists)
  const artifacts = engagement
    ? await getArtifactsByEngagementId(engagement.id)
    : [];

  // Get scan data
  const scan = (lead.extras as any)?.oneledgerScan || (lead.meta as any)?.extras?.oneledgerScan;
  const recommendedModuleIds = scan?.recommendedModuleIds as string[] || [];
  const recommendedGateId = scan?.recommendedGateId as string | undefined;

  // Get data request list
  const dataRequestList = getDataRequestListForMultiple(
    recommendedGateId ? [recommendedGateId] : undefined,
    recommendedModuleIds
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Client Portal - OneLedger™</h1>
      
      <ClientPortalTabs
        token={token}
        lead={lead}
        engagement={engagement || undefined}
        gateInstances={gateInstances}
        artifacts={artifacts}
        dataRequestList={dataRequestList}
        recommendedGateId={recommendedGateId}
      />
    </div>
  );
}
