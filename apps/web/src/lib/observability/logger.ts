/**
 * Structured Logger
 * 
 * Structured logging với PII masking.
 * Production: không log email/phone thô, chỉ hash/masked.
 */

import { hashIp } from "@/lib/security/ip";

/**
 * Log event types
 */
export type LogEvent =
  | "lead_submitted"
  | "lead_rejected"
  | "lead_duplicated"
  | "lead_sink_failed"
  | "csp_violation";

/**
 * Mask email for logging
 */
function maskEmail(email: string): string {
  if (!email || email.length < 3) return "***";
  const [local, domain] = email.split("@");
  if (!domain) return "***";
  const maskedLocal =
    local.length > 2
      ? `${local[0]}${"*".repeat(local.length - 2)}${local[local.length - 1]}`
      : "**";
  return `${maskedLocal}@${domain}`;
}

/**
 * Mask phone for logging
 */
function maskPhone(phone?: string): string {
  if (!phone || phone.length < 4) return "***";
  return `${phone.slice(0, 2)}${"*".repeat(phone.length - 4)}${phone.slice(-2)}`;
}

/**
 * Structured log entry
 */
interface LogEntry {
  event: LogEvent;
  leadId?: string;
  source?: string;
  serviceSlugs?: string[];
  utm_source?: string;
  ipHash?: string;
  elapsedMs?: number;
  error?: string;
  code?: string;
  [key: string]: unknown;
}

/**
 * Log structured event
 */
export function logEvent(entry: LogEntry): void {
  const logData: LogEntry = {
    ...entry,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  };

  // Mask PII in production
  if (process.env.NODE_ENV === "production") {
    // Remove any PII fields that might have leaked in
    delete logData.email;
    delete logData.phone;
    delete logData.fullName;
  }

  // Log as JSON for structured logging
  if (process.env.NODE_ENV === "development") {
    console.log(`[${entry.event}]`, JSON.stringify(logData, null, 2));
  } else {
    // In production, log as single-line JSON for log aggregation
    console.log(JSON.stringify(logData));
  }
}

/**
 * Log lead submission
 */
export function logLeadSubmitted(
  leadId: string,
  source: string,
  serviceSlugs: string[] | undefined,
  utm_source: string | undefined,
  ip: string,
  elapsedMs: number
): void {
  logEvent({
    event: "lead_submitted",
    leadId,
    source,
    serviceSlugs,
    utm_source,
    ipHash: hashIp(ip),
    elapsedMs,
  });
}

/**
 * Log lead rejection
 */
export function logLeadRejected(
  code: string,
  source: string | undefined,
  ip: string,
  error?: string
): void {
  logEvent({
    event: "lead_rejected",
    code,
    source,
    ipHash: hashIp(ip),
    error,
  });
}

/**
 * Log lead duplication
 */
export function logLeadDuplicated(
  leadId: string,
  duplicateOf: string,
  source: string
): void {
  logEvent({
    event: "lead_duplicated",
    leadId,
    duplicateOf,
    source,
  });
}

/**
 * Log sink failure
 */
export function logSinkFailed(
  leadId: string,
  sinkName: string,
  error: string
): void {
  logEvent({
    event: "lead_sink_failed",
    leadId,
    sinkName: sinkName,
    error,
  });
}

/**
 * Log CSP violation
 */
export function logCspViolation(violation: {
  documentUri?: string;
  violatedDirective?: string;
  effectiveDirective?: string;
  originalPolicy?: string;
  blockedUri?: string;
  sourceFile?: string;
  lineNumber?: number;
  columnNumber?: number;
  statusCode?: number;
  referrer?: string;
  userAgent?: string;
  timestamp?: string;
}): void {
  logEvent({
    event: "csp_violation",
    documentUri: violation.documentUri,
    violatedDirective: violation.violatedDirective,
    effectiveDirective: violation.effectiveDirective,
    blockedUri: violation.blockedUri,
    sourceFile: violation.sourceFile,
    lineNumber: violation.lineNumber,
    columnNumber: violation.columnNumber,
    statusCode: violation.statusCode,
    referrer: violation.referrer,
    userAgent: violation.userAgent,
  });
}

/**
 * Hash string for logging (one-way hash)
 */
function hashString(value: string): string {
  // Simple hash for privacy (not cryptographically secure, just for logging)
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    const char = value.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return `hash_${Math.abs(hash).toString(16)}`;
}

/**
 * Redact email: hash in production, mask in development
 */
export function redactEmail(email: string): string {
  if (process.env.NODE_ENV === "production") {
    return hashString(email);
  }
  return maskEmail(email);
}

/**
 * Redact phone: hash in production, mask in development
 */
export function redactPhone(phone?: string): string {
  if (!phone) return "***";
  if (process.env.NODE_ENV === "production") {
    return hashString(phone);
  }
  return maskPhone(phone);
}

