/**
 * Next.js Instrumentation
 * 
 * Setup structured logger và prepare OpenTelemetry.
 * Phase sau: bật exporter cho OpenTelemetry.
 */

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Setup structured logging
    // Logger is already set up in lib/observability/logger.ts
    
    // TODO: Setup OpenTelemetry exporter in future phase
    // Example:
    // import { NodeSDK } from "@opentelemetry/sdk-node";
    // const sdk = new NodeSDK({ ... });
    // sdk.start();
  }
}

