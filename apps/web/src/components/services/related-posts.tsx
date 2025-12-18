"use client";

import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/types/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { AppBadge } from "@/components/shared/wrappers/app-badge";

interface RelatedPostsProps {
  posts: Post[];
  title?: string;
}

/**
 * RelatedPosts - Display related posts section
 * 
 * Hiển thị các bài viết liên quan (Our Thinking).
 * Sort mới nhất, hiển thị readingTime nếu có.
 */
export function RelatedPosts({ posts, title = "Our Thinking" }: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  // Sort theo date (mới nhất trước)
  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="space-y-6">
      <ProsfinSectionHeading title={title} align="left" titleSize="lg" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedPosts.map((post) => (
          <Card key={post.id} className="transition-all hover:shadow-md overflow-hidden">
            {post.coverImage && (
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <CardHeader>
              <div className="mb-2 flex flex-wrap gap-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <AppBadge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </AppBadge>
                ))}
              </div>
              <CardTitle className="text-lg">
                <Link
                  href={post.href}
                  className="hover:text-primary transition-colors"
                >
                  {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-sm text-muted-foreground">{post.excerpt}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{post.date}</span>
                {post.readingTime && (
                  <>
                    <span>•</span>
                    <span>{post.readingTime} phút đọc</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

