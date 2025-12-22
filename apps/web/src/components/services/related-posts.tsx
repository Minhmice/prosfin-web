"use client";

import { ArrowRight } from "lucide-react";
import type { Post } from "@/types/content";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import { ProsfinSecondaryButton } from "@/components/shared/button/secondary-button";
import { FeaturedCard } from "./featured-card";
import { PostCard } from "./post-card";

interface RelatedPostsProps {
  posts: Post[];
  title?: string;
}

/**
 * RelatedPosts - Display related posts section
 * 
 * Hiển thị các bài viết liên quan (Our Thinking).
 * Sort mới nhất, bài đầu tiên dùng FeaturedCard (lớn hơn), các bài còn lại dùng PostCard.
 */
export function RelatedPosts({ posts, title = "Our Thinking" }: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  // Sort theo date (mới nhất trước)
  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const [featuredPost, ...otherPosts] = sortedPosts;

  return (
    <div className="space-y-6">
      <ProsfinSectionHeading title={title} align="left" titleSize="lg" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Featured post - lớn hơn, chiếm 2 cột trên desktop */}
        {featuredPost && <FeaturedCard post={featuredPost} />}

        {/* Các posts còn lại */}
        {otherPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* CTA to view more posts */}
      <div className="flex justify-center pt-4">
        <ProsfinSecondaryButton href="/insights" className="gap-2">
          Xem thêm bài viết
          <ArrowRight className="h-4 w-4" />
        </ProsfinSecondaryButton>
      </div>
    </div>
  );
}

