/**
 * Observability Tracing
 * 
 * Tracing utilities for requestId and leadId correlation.
 * Attach correlation IDs to logs for debugging.
 */

/**
 * Generate request ID
 */
export function generateRequestId(): string {
  // Use crypto.randomUUID if available, fallback to timestamp + random
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `req_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Trace context
 */
export interface TraceContext {
  requestId: string;
  leadId?: string;
  source?: string;
  [key: string]: unknown;
}

/**
 * Global trace context (for async operations)
 */
let currentTraceContext: TraceContext | null = null;

/**
 * Set trace context
 */
export function setTraceContext(context: TraceContext): void {
  currentTraceContext = context;
}

/**
 * Get current trace context
 */
export function getTraceContext(): TraceContext | null {
  return currentTraceContext;
}

/**
 * Clear trace context
 */
export function clearTraceContext(): void {
  currentTraceContext = null;
}

/**
 * Add trace metadata to log entry
 */
export function enrichLogWithTrace(logData: Record<string, unknown>): Record<string, unknown> {
  const trace = getTraceContext();
  if (trace) {
    return {
      ...logData,
      requestId: trace.requestId,
      ...(trace.leadId && { leadId: trace.leadId }),
      ...(trace.source && { source: trace.source }),
    };
  }
  return logData;
}

/**
 * Create trace span (for async operations)
 */
export async function withTrace<T>(
  context: TraceContext,
  fn: () => Promise<T>
): Promise<T> {
  const previousContext = currentTraceContext;
  setTraceContext(context);
  try {
    return await fn();
  } finally {
    if (previousContext) {
      setTraceContext(previousContext);
    } else {
      clearTraceContext();
    }
  }
}

