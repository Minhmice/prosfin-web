/**
 * Content Security Policy (CSP)
 * 
 * CSP builder theo env + allowed domains.
 * Start với Report-Only, sau đó tighten và enforce.
 */

export interface CSPDirectives {
  "default-src"?: string[];
  "script-src"?: string[];
  "style-src"?: string[];
  "img-src"?: string[];
  "font-src"?: string[];
  "connect-src"?: string[];
  "frame-src"?: string[];
  "object-src"?: string[];
  "base-uri"?: string[];
  "form-action"?: string[];
  "frame-ancestors"?: string[];
  "upgrade-insecure-requests"?: boolean;
  "report-uri"?: string;
  "report-to"?: string;
}

/**
 * Build CSP string from directives
 */
function buildCSPString(directives: CSPDirectives): string {
  const parts: string[] = [];

  Object.entries(directives).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (key === "upgrade-insecure-requests" && value === true) {
      parts.push(key);
    } else if (key === "report-uri" || key === "report-to") {
      parts.push(`${key} ${value}`);
    } else if (Array.isArray(value)) {
      if (value.length > 0) {
        parts.push(`${key} ${value.join(" ")}`);
      }
    }
  });

  return parts.join("; ");
}

/**
 * Get CSP directives based on environment
 */
export function getCSPDirectives(reportOnly: boolean = true): CSPDirectives {
  const isProduction = process.env.NODE_ENV === "production";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn";
  const reportUri = "/api/csp-report";

  // Allowed domains
  const turnstileDomain = "challenges.cloudflare.com";
  const analyticsDomains: string[] = []; // Add analytics domains if needed (e.g., "www.googletagmanager.com")

  const directives: CSPDirectives = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      "'unsafe-inline'", // Required for Next.js inline scripts
      "'unsafe-eval'", // Required for Next.js in dev mode, consider removing in production
      `https://${turnstileDomain}`, // Cloudflare Turnstile
      ...analyticsDomains.map((domain) => `https://${domain}`),
    ],
    "style-src": [
      "'self'",
      "'unsafe-inline'", // Required for Tailwind CSS
      "https://fonts.googleapis.com",
    ],
    "img-src": [
      "'self'",
      "data:",
      "https:",
      "blob:",
    ],
    "font-src": [
      "'self'",
      "https://fonts.gstatic.com",
      "data:",
    ],
    "connect-src": [
      "'self'",
      `https://${turnstileDomain}`, // Turnstile verification
      ...analyticsDomains.map((domain) => `https://${domain}`),
    ],
    "frame-src": [
      `https://${turnstileDomain}`, // Turnstile widget
    ],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"], // Prevent embedding
    "upgrade-insecure-requests": isProduction,
  };

  // Add reporting
  if (reportOnly) {
    directives["report-uri"] = reportUri;
  }

  return directives;
}

/**
 * Get CSP header value
 */
export function getCSPHeader(reportOnly: boolean = true): string {
  const directives = getCSPDirectives(reportOnly);
  const cspString = buildCSPString(directives);
  return reportOnly ? `Content-Security-Policy-Report-Only: ${cspString}` : `Content-Security-Policy: ${cspString}`;
}

/**
 * Get CSP header name and value
 */
export function getCSPHeaderPair(reportOnly: boolean = true): { name: string; value: string } {
  const directives = getCSPDirectives(reportOnly);
  const cspString = buildCSPString(directives);
  return {
    name: reportOnly ? "Content-Security-Policy-Report-Only" : "Content-Security-Policy",
    value: cspString,
  };
}

