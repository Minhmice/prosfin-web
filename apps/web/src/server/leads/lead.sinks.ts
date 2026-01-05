/**
 * Lead Sinks
 * 
 * Pluggable sink system để lưu/đẩy leads.
 * Interface cho phép thay đổi đích mà không sửa UI/forms.
 */

import type { LeadNormalized } from "./lead.types";

/**
 * LeadSink Interface
 */
export interface LeadSink {
  save(lead: LeadNormalized): Promise<void>;
}

/**
 * ConsoleSink - Log structured JSON (dev)
 */
export class ConsoleSink implements LeadSink {
  async save(lead: LeadNormalized): Promise<void> {
    if (process.env.NODE_ENV === "development") {
      console.log("[ConsoleSink] Lead saved:", JSON.stringify(lead, null, 2));
    }
  }
}

/**
 * WebhookSink - POST to webhook URL với retry logic
 */
export class WebhookSink implements LeadSink {
  private webhookUrl: string;
  private webhookSecret?: string;
  private maxRetries: number = 3;
  private retryDelay: number = 1000; // 1 second

  constructor(webhookUrl: string, webhookSecret?: string) {
    this.webhookUrl = webhookUrl;
    this.webhookSecret = webhookSecret;
  }

  async save(lead: LeadNormalized): Promise<void> {
    if (!this.webhookUrl) {
      console.warn("[WebhookSink] No webhook URL configured, skipping");
      return;
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (this.webhookSecret) {
      headers["X-Webhook-Secret"] = this.webhookSecret;
    }

    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const response = await fetch(this.webhookUrl, {
          method: "POST",
          headers,
          body: JSON.stringify(lead),
        });

        if (!response.ok) {
          throw new Error(
            `Webhook returned ${response.status}: ${await response.text()}`
          );
        }

        // Success
        return;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (attempt < this.maxRetries) {
          // Wait before retry (exponential backoff)
          await new Promise((resolve) =>
            setTimeout(resolve, this.retryDelay * attempt)
          );
        }
      }
    }

    // All retries failed
    console.error(
      `[WebhookSink] Failed to send lead after ${this.maxRetries} attempts:`,
      lastError
    );
    throw lastError;
  }
}

/**
 * DbSink - Stub for Phase sau (Postgres/Prisma/Drizzle)
 */
export class DbSink implements LeadSink {
  async save(lead: LeadNormalized): Promise<void> {
    // TODO: Implement database save in future phase
    console.warn("[DbSink] Not implemented yet");
  }
}

/**
 * Get active sinks based on environment
 */
export function getActiveSinks(): LeadSink[] {
  const sinks: LeadSink[] = [];

  // Always add ConsoleSink in dev
  if (process.env.NODE_ENV === "development") {
    sinks.push(new ConsoleSink());
  }

  // Add WebhookSink if configured
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    sinks.push(
      new WebhookSink(
        webhookUrl,
        process.env.LEAD_WEBHOOK_SECRET
      )
    );
  }

  return sinks;
}

