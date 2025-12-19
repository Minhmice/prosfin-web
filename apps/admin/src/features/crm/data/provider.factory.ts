/**
 * CRM Provider Factory
 * Returns mock or HTTP provider based on env
 */

import type { CRMProvider } from "./provider"
import { HTTPCRMProvider } from "./provider.http"
import { MockCRMProvider } from "./provider.mock"

export function createCRMProvider(): CRMProvider {
  // Default to mock provider for development to avoid auth issues
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true" || process.env.NODE_ENV === "development") {
    return new MockCRMProvider()
  }
  return new HTTPCRMProvider()
}

