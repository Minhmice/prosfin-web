import { permanentRedirect } from "next/navigation";

/**
 * Redirect old resources routes to /research
 * 
 * SEO preservation: 308 Permanent Redirect
 */
export default async function ResourceRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  permanentRedirect(`/research/${slug}`);
}

