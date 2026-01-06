import { permanentRedirect } from "next/navigation";

/**
 * Redirect old /process route to /how-we-work
 * 
 * SEO preservation: 308 Permanent Redirect
 */
export default async function ProcessRedirect() {
  permanentRedirect("/how-we-work");
}
