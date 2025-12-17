import { notFound } from "next/navigation";
import { PostRenderer } from "@/components/content/post-renderer";
import type { Metadata } from "next";

// Post type for web app (simplified, matches admin structure)
type Post = {
  title: string;
  slug: string;
  excerpt?: string;
  content: any;
  seoTitle?: string;
  seoDescription?: string;
  canonical?: string;
  noindex?: boolean;
};

// For Phase 2, we'll use a simple mock data structure
// In Phase 3, this will fetch from API
async function getPost(slug: string): Promise<Post | null> {
  // Mock data - in Phase 3 this will be from API
  // For now, return null to show 404
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    ...(post.canonical && {
      alternates: {
        canonical: post.canonical,
      },
    }),
    ...(post.noindex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export default async function InsightPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12">
      <article>
        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
        {post.excerpt && (
          <p className="mb-8 text-xl text-muted-foreground">{post.excerpt}</p>
        )}
        <PostRenderer content={post.content} />
      </article>
    </div>
  );
}

