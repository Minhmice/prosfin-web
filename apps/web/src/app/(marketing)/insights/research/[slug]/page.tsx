import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getAllServices } from "@/lib/content/services";
import { getAllResearchPosts, getPostBySlug } from "@/lib/content/posts";
import { generateResearchMetadata } from "@/lib/research/metadata";
import { generateArticleSchema } from "@/lib/research/structured-data";
import { PostDetailWrapper } from "@/components/research/post-detail-wrapper";

/**
 * Research Detail Page
 * 
 * Server component with generateMetadata for SEO
 */
interface ResearchDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ResearchDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return generateResearchMetadata(post || null);
}

export default async function ResearchDetailPage({
  params,
}: ResearchDetailPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allServices = getAllServices();
  const allPosts = getAllResearchPosts();

  // Generate structured data
  const structuredData = generateArticleSchema(post);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Post Detail */}
      <PostDetailWrapper
        post={post}
        allServices={allServices}
        allPosts={allPosts}
      />
    </>
  );
}

