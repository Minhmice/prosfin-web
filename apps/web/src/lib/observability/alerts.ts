/**
 * Observability Alerts
 * 
 * Alert definitions for spike detection (403/429/500).
 * 
 * Note: This is a template. In production, integrate with actual alerting platform (PagerDuty, Opsgenie, etc.).
 */

import { getMetricsSummary } from "./metrics";

/**
 * Alert types
 */
export type AlertType = "spike_403" | "spike_429" | "spike_500" | "high_latency";

export interface Alert {
  type: AlertType;
  message: string;
  severity: "low" | "medium" | "high" | "critical";
  timestamp: number;
  metadata?: Record<string, unknown>;
}

/**
 * Alert thresholds
 */
const ALERT_THRESHOLDS = {
  spike_403: {
    windowMs: 5 * 60 * 1000, // 5 minutes
    threshold: 10, // 10+ 403 errors in 5 minutes
  },
  spike_429: {
    windowMs: 5 * 60 * 1000, // 5 minutes
    threshold: 20, // 20+ 429 errors in 5 minutes
  },
  spike_500: {
    windowMs: 5 * 60 * 1000, // 5 minutes
    threshold: 5, // 5+ 500 errors in 5 minutes
  },
  high_latency: {
    windowMs: 10 * 60 * 1000, // 10 minutes
    p95Threshold: 5000, // 5 seconds
    p99Threshold: 10000, // 10 seconds
  },
};

/**
 * Check for alerts
 */
export function checkAlerts(): Alert[] {
  const alerts: Alert[] = [];

  // Check spike_403
  const error403 = getMetricsSummary(ALERT_THRESHOLDS.spike_403.windowMs).errorDistribution["403"] || 0;
  if (error403 >= ALERT_THRESHOLDS.spike_403.threshold) {
    alerts.push({
      type: "spike_403",
      message: `Spike in 403 errors: ${error403} errors in last 5 minutes (Turnstile failures?)`,
      severity: "high",
      timestamp: Date.now(),
      metadata: { count: error403 },
    });
  }

  // Check spike_429
  const error429 = getMetricsSummary(ALERT_THRESHOLDS.spike_429.windowMs).errorDistribution["429"] || 0;
  if (error429 >= ALERT_THRESHOLDS.spike_429.threshold) {
    alerts.push({
      type: "spike_429",
      message: `Spike in 429 errors: ${error429} rate limit hits in last 5 minutes`,
      severity: "medium",
      timestamp: Date.now(),
      metadata: { count: error429 },
    });
  }

  // Check spike_500
  const error500 = getMetricsSummary(ALERT_THRESHOLDS.spike_500.windowMs).errorDistribution["500"] || 0;
  if (error500 >= ALERT_THRESHOLDS.spike_500.threshold) {
    alerts.push({
      type: "spike_500",
      message: `Spike in 500 errors: ${error500} internal errors in last 5 minutes`,
      severity: "critical",
      timestamp: Date.now(),
      metadata: { count: error500 },
    });
  }

  // Check high latency
  const latencySummary = getMetricsSummary(ALERT_THRESHOLDS.high_latency.windowMs);
  if (latencySummary.latencyP95 >= ALERT_THRESHOLDS.high_latency.p95Threshold) {
    alerts.push({
      type: "high_latency",
      message: `High latency detected: P95=${latencySummary.latencyP95}ms, P99=${latencySummary.latencyP99}ms`,
      severity: "medium",
      timestamp: Date.now(),
      metadata: {
        p95: latencySummary.latencyP95,
        p99: latencySummary.latencyP99,
      },
    });
  }

  return alerts;
}

/**
 * Send alert (template - implement with actual alerting platform)
 */
export function sendAlert(alert: Alert): void {
  // In development, log alert
  if (process.env.NODE_ENV === "development") {
    console.warn(`[Alert] ${alert.type}:`, alert.message, alert.metadata);
  }

  // In production, send to alerting platform
  // Example:
  // if (alert.severity === "critical") {
  //   pagerDuty.triggerIncident(alert.message, alert.metadata);
  // } else {
  //   slack.sendMessage(`[${alert.severity.toUpperCase()}] ${alert.message}`, alert.metadata);
  // }
}

/**
 * Run alert check (should be called periodically)
 */
export function runAlertCheck(): Alert[] {
  const alerts = checkAlerts();
  alerts.forEach((alert) => {
    sendAlert(alert);
  });
  return alerts;
}

