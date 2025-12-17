"use client";

import * as React from "react";
import { use } from "react";
import Link from "next/link";
import { Button } from "@prosfin/ui";
import { ArrowLeft } from "lucide-react";
import { listPosts } from "@/lib/data/posts";
import { PostPreview } from "@/components/content/preview/post-preview";

interface PreviewPageProps {
  params: Promise<{ slug: string }>;
}

export default function PreviewPage({ params }: PreviewPageProps) {
  const { slug } = use(params);
  const [post, setPost] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadPost = async () => {
      try {
        const allPosts = await listPosts();
        const found = allPosts.find((p) => p.slug === slug);
        setPost(found || null);
      } catch (error) {
        console.error("Failed to load post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Post not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto flex h-14 items-center justify-between px-6">
          <Link href={`/content/${post.slug}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 size-4" />
              Back to Editor
            </Button>
          </Link>
          <div className="text-sm text-muted-foreground">
            Preview Mode • {post.status}
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-4xl px-6 py-12">
        <article>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          {post.excerpt && (
            <p className="text-xl text-muted-foreground mb-8">{post.excerpt}</p>
          )}
          <PostPreview content={post.content} />
        </article>
      </div>
    </div>
  );
}

