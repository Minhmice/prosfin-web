/**
 * Lead Types
 * 
 * TypeScript types inferred từ lead schema.
 * Re-export từ schema để dùng ở nơi khác.
 */

export type {
  LeadSource,
  Contact,
  Company,
  Intent,
  Attribution,
  Meta,
  Consent,
  LeadNormalized,
} from "./lead.schema";

import type { LeadSource, Attribution } from "./lead.schema";

/**
 * Raw form payload types (before normalization)
 */
export interface RawLeadPayload {
  [key: string]: unknown;
}

/**
 * Lead submission request
 */
export interface LeadSubmissionRequest {
  source: LeadSource;
  payload: RawLeadPayload;
  attribution?: Attribution;
  turnstileToken?: string;
}

/**
 * Lead submission response
 */
export interface LeadSubmissionResponse {
  ok: boolean;
  id?: string;
  code?: string;
  message?: string;
  fields?: Array<{ field: string; message: string }>;
  retryAfterSec?: number;
  duplicateOf?: string;
}

