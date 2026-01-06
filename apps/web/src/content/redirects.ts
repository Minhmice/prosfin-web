/**
 * Redirects Registry
 * 
 * Single source of truth for all redirect rules.
 * Maps legacy routes to canonical paths.
 * 
 * Rules:
 * - Always redirect to canonical (no chains)
 * - Use permanent: true (301) for SEO
 * - Direct mapping (old → canonical, not old → mid → canonical)
 */

export interface RedirectRule {
  source: string;
  destination: string;
  permanent: boolean;
  note?: string;
}

/**
 * Redirect Rules
 * 
 * All legacy routes mapped to canonical paths.
 */
export const REDIRECT_RULES: RedirectRule[] = [
  // ============================================
  // Insights Legacy Routes
  // ============================================
  
  // Research routes → /insights
  {
    source: "/research",
    destination: "/insights",
    permanent: true,
    note: "Research content merged into Insights Hub",
  },
  {
    source: "/research/:path*",
    destination: "/insights",
    permanent: true,
    note: "Research content merged into Insights Hub",
  },
  {
    source: "/insights/research",
    destination: "/insights",
    permanent: true,
    note: "Research content merged into Insights Hub",
  },
  {
    source: "/insights/research/:path*",
    destination: "/insights",
    permanent: true,
    note: "Research content merged into Insights Hub",
  },

  // Knowledge routes → /insights
  {
    source: "/knowledge",
    destination: "/insights",
    permanent: true,
    note: "Knowledge base merged into Insights Hub",
  },
  {
    source: "/knowledge/:path*",
    destination: "/insights",
    permanent: true,
    note: "Knowledge base merged into Insights Hub",
  },

  // Resources routes → /insights?format=an-pham
  {
    source: "/resources",
    destination: "/insights?format=an-pham",
    permanent: true,
    note: "Resources (ấn phẩm) merged into Insights Hub with format filter",
  },
  {
    source: "/resources/:path*",
    destination: "/insights?format=an-pham",
    permanent: true,
    note: "Resources (ấn phẩm) merged into Insights Hub with format filter",
  },

  // Case studies routes → /insights?format=case-study
  {
    source: "/case-studies",
    destination: "/insights?format=case-study",
    permanent: true,
    note: "Case studies merged into Insights Hub with format filter",
  },
  {
    source: "/case-studies/:path*",
    destination: "/insights?format=case-study",
    permanent: true,
    note: "Case studies merged into Insights Hub with format filter",
  },
  {
    source: "/insights/case-studies",
    destination: "/insights?format=case-study",
    permanent: true,
    note: "Case studies merged into Insights Hub with format filter",
  },
  {
    source: "/insights/case-studies/:path*",
    destination: "/insights?format=case-study",
    permanent: true,
    note: "Case studies merged into Insights Hub with format filter",
  },

  // ============================================
  // Services Legacy Routes
  // ============================================
  
  // ClearData legacy route
  {
    source: "/services/cleardata",
    destination: "/services/ke-toan-thue/prosfin-cleardata",
    permanent: true,
    note: "ClearData moved to new category structure",
  },
  {
    source: "/services/cleardata/:path*",
    destination: "/services/ke-toan-thue/prosfin-cleardata",
    permanent: true,
    note: "ClearData moved to new category structure",
  },

  // OneLedger legacy route
  {
    source: "/services/oneledger",
    destination: "/services/kiem-soat-noi-bo/oneledger",
    permanent: true,
    note: "OneLedger moved to new category structure",
  },
  {
    source: "/services/oneledger/:path*",
    destination: "/services/kiem-soat-noi-bo/oneledger",
    permanent: true,
    note: "OneLedger moved to new category structure",
  },

  // Note: Old /services/[slug] routes are handled by the new structure
  // If a service slug doesn't match new structure, it will 404 (expected)
  // Specific service redirects can be added here if needed
];

/**
 * Get redirect rules for Next.js config
 * 
 * Maps RedirectRule[] to Next.js redirect format
 */
export function getNextJsRedirects() {
  return REDIRECT_RULES.map((rule) => ({
    source: rule.source,
    destination: rule.destination,
    permanent: rule.permanent,
  }));
}

