import { permanentRedirect } from "next/navigation";

/**
 * Redirect old insights routes to /research
 * 
 * SEO preservation: 308 Permanent Redirect
 */
export default async function InsightRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  permanentRedirect(`/research/${slug}`);
}

