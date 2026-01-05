/**
 * Turnstile Verification
 * 
 * Server-side verification của Cloudflare Turnstile tokens.
 */

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Verify Turnstile token
 * 
 * @param token - Turnstile token from client
 * @param remoteIp - Optional remote IP for additional validation
 * @returns true if valid, false otherwise
 */
export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string
): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.warn("[Turnstile] No secret key configured, skipping verification");
    // In development, allow if no secret key
    return process.env.NODE_ENV === "development";
  }

  if (!token) {
    return false;
  }

  try {
    const formData = new FormData();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error(
        `[Turnstile] Verification request failed: ${response.status}`
      );
      return false;
    }

    const data = (await response.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };

    if (!data.success) {
      console.warn(
        `[Turnstile] Verification failed:`,
        data["error-codes"] || "unknown error"
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Turnstile] Verification error:", error);
    return false;
  }
}

