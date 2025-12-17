import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { PostRenderer } from "@/components/content/post-renderer";
import { generatePostMetadata as generateMetadataHelper } from "@/lib/content/metadata";
import type { Metadata } from "next";

type Post = {
  title: string;
  slug: string;
  excerpt?: string;
  content: any;
  seoTitle?: string;
  seoDescription?: string;
  canonical?: string;
  noindex?: boolean;
  publishedAt?: string;
  bucket: "insights" | "resources" | "knowledge";
};

async function getPost(slug: string, isDraft: boolean = false): Promise<Post | null> {
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const isDraft = draftMode().isEnabled;
  const post = await getPost(slug, isDraft);

  return generateMetadataHelper(post, isDraft);
}

export default async function KnowledgePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const isDraft = draftMode().isEnabled;
  const post = await getPost(slug, isDraft);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12">
      {isDraft && (
        <div className="mb-4 rounded-md border border-yellow-500 bg-yellow-50 p-4 text-yellow-800">
          <p className="font-medium">Draft Preview</p>
          <p className="text-sm">You are viewing a draft version of this post.</p>
        </div>
      )}
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

