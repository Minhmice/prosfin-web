/**
 * Security Headers
 * 
 * Single source of truth for security headers configuration.
 * Applied globally via middleware.
 */

export interface SecurityHeaders {
  "Strict-Transport-Security"?: string;
  "X-Content-Type-Options"?: string;
  "X-Frame-Options"?: string;
  "Referrer-Policy"?: string;
  "Permissions-Policy"?: string;
  "Cross-Origin-Opener-Policy"?: string;
  "Cross-Origin-Resource-Policy"?: string;
}

/**
 * Get security headers configuration
 */
export function getSecurityHeaders(): SecurityHeaders {
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn";

  const headers: SecurityHeaders = {
    // HSTS: Force HTTPS in production
    "Strict-Transport-Security": isProduction
      ? "max-age=31536000; includeSubDomains; preload"
      : undefined,

    // Prevent MIME type sniffing
    "X-Content-Type-Options": "nosniff",

    // Prevent clickjacking (will be overridden by CSP frame-ancestors if CSP is enabled)
    "X-Frame-Options": "DENY",

    // Control referrer information
    "Referrer-Policy": "strict-origin-when-cross-origin",

    // Permissions Policy: restrict browser features
    "Permissions-Policy": [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "interest-cohort=()", // Disable FLoC
    ].join(", "),

    // Cross-Origin-Opener-Policy: isolate browsing context
    "Cross-Origin-Opener-Policy": "same-origin-allow-popups",

    // Cross-Origin-Resource-Policy: prevent cross-origin resource access
    "Cross-Origin-Resource-Policy": "same-origin",
  };

  // Remove undefined values
  return Object.fromEntries(
    Object.entries(headers).filter(([_, value]) => value !== undefined)
  ) as SecurityHeaders;
}

/**
 * Apply security headers to response
 */
export function applySecurityHeaders(headers: Headers): void {
  const securityHeaders = getSecurityHeaders();
  Object.entries(securityHeaders).forEach(([key, value]) => {
    if (value) {
      headers.set(key, value);
    }
  });
}

