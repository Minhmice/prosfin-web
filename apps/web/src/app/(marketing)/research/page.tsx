import { permanentRedirect } from "next/navigation";

/**
 * Redirect old /research route to /insights
 * 
 * SEO preservation: 308 Permanent Redirect
 */
export default async function ResearchRedirect({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const urlSearchParams = new URLSearchParams();

  // Convert searchParams to URLSearchParams
  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((v) => urlSearchParams.append(key, v));
      } else {
        urlSearchParams.set(key, value);
      }
    }
  });

  const queryString = urlSearchParams.toString();
  const redirectUrl = `/insights${queryString ? `?${queryString}` : ""}`;
  permanentRedirect(redirectUrl);
}
