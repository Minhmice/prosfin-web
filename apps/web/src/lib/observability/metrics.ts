/**
 * Observability Metrics
 * 
 * Metrics utilities for tracking lead submit rate, error codes, latency.
 * 
 * Note: This is a template. In production, integrate with actual metrics platform (DataDog, New Relic, etc.).
 */

/**
 * Metric types
 */
export type MetricName =
  | "lead_submit_rate"
  | "lead_submit_error"
  | "lead_submit_latency"
  | "lead_submit_by_source"
  | "error_code_distribution";

export interface MetricValue {
  name: MetricName;
  value: number;
  tags?: Record<string, string>;
  timestamp?: number;
}

/**
 * In-memory metrics store (MVP)
 * In production, send to metrics platform
 */
const metricsStore: MetricValue[] = [];

/**
 * Record metric
 */
export function recordMetric(metric: MetricValue): void {
  const metricWithTimestamp: MetricValue = {
    ...metric,
    timestamp: Date.now(),
  };

  metricsStore.push(metricWithTimestamp);

  // In development, log metrics
  if (process.env.NODE_ENV === "development") {
    console.log(`[Metrics] ${metric.name}:`, metric.value, metric.tags);
  }

  // In production, send to metrics platform
  // Example:
  // if (window.datadogRum) {
  //   window.datadogRum.addAction(metric.name, { value: metric.value, ...metric.tags });
  // }
}

/**
 * Record lead submit rate by source
 */
export function recordLeadSubmitRate(source: string, success: boolean): void {
  recordMetric({
    name: "lead_submit_rate",
    value: success ? 1 : 0,
    tags: { source, status: success ? "success" : "failure" },
  });
}

/**
 * Record error code distribution
 */
export function recordErrorCode(code: string, source?: string): void {
  recordMetric({
    name: "error_code_distribution",
    value: 1,
    tags: { code, ...(source && { source }) },
  });
}

/**
 * Record latency (milliseconds)
 */
export function recordLatency(latencyMs: number, source?: string): void {
  recordMetric({
    name: "lead_submit_latency",
    value: latencyMs,
    tags: { ...(source && { source }) },
  });
}

/**
 * Get metrics summary (for dashboard/reporting)
 */
export function getMetricsSummary(timeWindowMs: number = 60 * 60 * 1000): {
  submitRate: number;
  errorDistribution: Record<string, number>;
  latencyP95: number;
  latencyP99: number;
} {
  const cutoff = Date.now() - timeWindowMs;
  const recentMetrics = metricsStore.filter((m) => (m.timestamp || 0) >= cutoff);

  const submitMetrics = recentMetrics.filter((m) => m.name === "lead_submit_rate");
  const successCount = submitMetrics.filter((m) => m.tags?.status === "success").length;
  const totalCount = submitMetrics.length;
  const submitRate = totalCount > 0 ? successCount / totalCount : 0;

  const errorMetrics = recentMetrics.filter((m) => m.name === "error_code_distribution");
  const errorDistribution: Record<string, number> = {};
  errorMetrics.forEach((m) => {
    const code = m.tags?.code || "unknown";
    errorDistribution[code] = (errorDistribution[code] || 0) + 1;
  });

  const latencyMetrics = recentMetrics.filter((m) => m.name === "lead_submit_latency");
  const latencies = latencyMetrics.map((m) => m.value).sort((a, b) => a - b);
  const latencyP95 = latencies.length > 0 ? latencies[Math.floor(latencies.length * 0.95)] : 0;
  const latencyP99 = latencies.length > 0 ? latencies[Math.floor(latencies.length * 0.99)] : 0;

  return {
    submitRate,
    errorDistribution,
    latencyP95,
    latencyP99,
  };
}

