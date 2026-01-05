/**
 * Lead Types
 * 
 * Type definitions for lead magnet engine.
 */

/**
 * Lead Attribution - Source tracking
 */
export interface LeadAttribution {
  source: "tool" | "service" | "research" | "contact" | "other";
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  toolSlug?: string;
  serviceSlug?: string;
  postId?: string;
}

/**
 * Lead Context - Context data từ tool/service
 */
export interface LeadContext {
  toolSlug?: string;
  inputs?: Record<string, unknown>;
  outputs?: {
    metrics?: Array<{ name: string; value: number | string }>;
    flags?: Array<{ type: string; message: string }>;
  };
  serviceSlug?: string;
  postId?: string;
}

/**
 * Lead Contact - Contact information
 */
export interface LeadContact {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role?: string;
}

/**
 * Lead - Complete lead record
 */
export interface Lead {
  id: string;
  createdAt: string;
  source: LeadAttribution["source"];
  attribution: LeadAttribution;
  context?: LeadContext;
  contact: LeadContact;
  status?: "new" | "contacted" | "qualified" | "converted";
  notes?: string;
}

