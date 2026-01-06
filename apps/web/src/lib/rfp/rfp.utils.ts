/**
 * RFP Utilities
 * 
 * Helper functions for parsing query params, building payloads, and routing.
 */

import type { RfpFormValues } from "./rfp.schema";
import { isValidRfpService, getRfpServiceByValue } from "@/content/rfp.options";

export interface RfpMetadata {
  sourcePath: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  userAgent?: string;
}

export interface RfpSubmissionPayload {
  id: string;
  createdAt: string;
  service: string;
  contact: {
    title: string;
    firstName: string;
    lastName: string;
    jobTitle?: string;
    email: string;
    phone?: string;
  };
  company: {
    companyLocation: string;
    industry: string;
    companyName?: string;
    yearlyRevenue?: string;
  };
  message: {
    comments: string;
  };
  attachment?: {
    filename: string;
    size: number;
    mime: string;
    storageUrl?: string;
  };
  meta: RfpMetadata;
}

/**
 * Parse service from query params
 */
export function parseServiceFromQuery(
  queryService: string | string[] | undefined
): string | undefined {
  if (!queryService) return undefined;
  const service = Array.isArray(queryService) ? queryService[0] : queryService;
  return isValidRfpService(service) ? service : undefined;
}

/**
 * Build RFP submission payload
 */
export function buildRfpPayload(
  formData: RfpFormValues,
  metadata: RfpMetadata,
  attachmentInfo?: {
    filename: string;
    size: number;
    mime: string;
    storageUrl?: string;
  }
): RfpSubmissionPayload {
  const service = getRfpServiceByValue(formData.service);
  
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    service: formData.service,
    contact: {
      title: formData.title,
      firstName: formData.firstName,
      lastName: formData.lastName,
      jobTitle: formData.jobTitle,
      email: formData.email,
      phone: formData.phone || undefined,
    },
    company: {
      companyLocation: formData.companyLocation,
      industry: formData.industry,
      companyName: formData.companyName,
      yearlyRevenue: formData.yearlyRevenue,
    },
    message: {
      comments: formData.comments,
    },
    attachment: attachmentInfo,
    meta: metadata,
  };
}

/**
 * Get routing team/bucket for service
 */
export function getRfpRoutingTeam(serviceValue: string): string | undefined {
  const service = getRfpServiceByValue(serviceValue);
  return service?.team;
}

/**
 * Extract metadata from request
 */
export function extractRfpMetadata(
  sourcePath: string,
  headers: Headers
): RfpMetadata {
  const referrer = headers.get("referer") || undefined;
  const userAgent = headers.get("user-agent") || undefined;

  // UTM params should be passed from client (in form data or query)
  // For now, we'll extract from headers if available
  // In production, these should come from form submission or session

  return {
    sourcePath,
    referrer,
    userAgent,
  };
}

