/**
 * useLeadSubmit - Reusable hook cho form submission
 * 
 * Handle: submit, loading state, error handling, retry logic.
 */

"use client";

import * as React from "react";
import type {
  LeadSource,
  RawLeadPayload,
  Attribution,
} from "@/server/leads/lead.types";
import { ERROR_CODES } from "@/lib/leads/error-codes";

interface UseLeadSubmitOptions {
  source: LeadSource;
  attribution?: Attribution;
  onSuccess?: (leadId: string, isDuplicate?: boolean) => void;
  onError?: (error: Error) => void;
}

interface UseLeadSubmitReturn {
  submit: (payload: RawLeadPayload, turnstileToken?: string) => Promise<void>;
  isSubmitting: boolean;
  error: Error | null;
  errorCode: string | null;
  retry: () => void;
  reset: () => void;
}

/**
 * useLeadSubmit - Hook for lead form submission
 */
export function useLeadSubmit({
  source,
  attribution,
  onSuccess,
  onError,
}: UseLeadSubmitOptions): UseLeadSubmitReturn {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [errorCode, setErrorCode] = React.useState<string | null>(null);
  const [lastPayload, setLastPayload] = React.useState<RawLeadPayload | null>(null);
  const [lastTurnstileToken, setLastTurnstileToken] = React.useState<string | undefined>();

  const submit = React.useCallback(
    async (payload: RawLeadPayload, turnstileToken?: string) => {
      setIsSubmitting(true);
      setError(null);
      setErrorCode(null);
      setLastPayload(payload);
      setLastTurnstileToken(turnstileToken);

      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source,
            payload,
            attribution,
            turnstileToken,
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.ok) {
          const error = new Error(data.message || "Failed to submit lead");
          setError(error);
          setErrorCode(data.code || ERROR_CODES.INTERNAL_ERROR);
          onError?.(error);
          return;
        }

        // Success
        onSuccess?.(data.id, data.duplicateOf !== undefined);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        setErrorCode(ERROR_CODES.INTERNAL_ERROR);
        onError?.(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [source, attribution, onSuccess, onError]
  );

  const retry = React.useCallback(() => {
    if (lastPayload) {
      submit(lastPayload, lastTurnstileToken);
    }
  }, [lastPayload, lastTurnstileToken, submit]);

  const reset = React.useCallback(() => {
    setError(null);
    setErrorCode(null);
    setLastPayload(null);
    setLastTurnstileToken(undefined);
  }, []);

  return {
    submit,
    isSubmitting,
    error,
    errorCode,
    retry,
    reset,
  };
}

