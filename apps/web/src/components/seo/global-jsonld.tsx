/**
 * Global JSON-LD Component
 * 
 * Injects global Organization and WebSite schemas into the page.
 */

import Script from "next/script";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
} from "./jsonld";

/**
 * GlobalJsonLd - Component to inject global JSON-LD schemas
 */
export function GlobalJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prosfin.vn";
  const organizationSchema = generateOrganizationSchema(baseUrl);
  const websiteSchema = generateWebSiteSchema(baseUrl);

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

