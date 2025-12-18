/**
 * CRM Provider Factory
 * Returns mock or HTTP provider based on env
 */

import type { CRMProvider } from "./provider"
import { HTTPCRMProvider } from "./provider.http"
import { MockCRMProvider } from "./provider.mock"

export function createCRMProvider(): CRMProvider {
  // #region agent log
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true"
  fetch('http://127.0.0.1:7242/ingest/22c7f50c-2177-46e7-80ae-e3c707e11773',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'provider.factory.ts:11',message:'Creating provider',data:{useMock,env:process.env.NEXT_PUBLIC_USE_MOCK},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{})
  // #endregion
  // Default to mock provider for development to avoid auth issues
  if (useMock || process.env.NODE_ENV === "development") {
    return new MockCRMProvider()
  }
  return new HTTPCRMProvider()
}

