"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/types/content";
import { cn } from "@/lib/utils";
import { AppBadge } from "@/components/shared/wrappers/app-badge";

interface PostCardProps {
  post: Post;
  className?: string;
}

/**
 * PostCard - Component hiển thị post card (phiên bản nhỏ hơn FeaturedCard)
 * 
 * Card với layout dọc (image trên, content dưới) cho các posts thường.
 * Toàn bộ card có thể click để đi đến bài viết.
 */
export function PostCard({ post, className }: PostCardProps) {
  return (
    <Link
      href={post.href}
      className={cn(
        "group block h-full overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className
      )}
      aria-label={`Đọc bài viết: ${post.title}`}
    >
      <article className="flex h-full flex-col">
        {/* Image - Full scale from top */}
        <div className="relative h-64 w-full shrink-0 overflow-hidden bg-muted">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="h-full w-full bg-muted" />
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            {/* Category/Tags */}
            <div className="mb-3 flex flex-wrap gap-2">
              {post.tags?.slice(0, 2).map((tag) => (
                <AppBadge key={tag} variant="outline" className="text-xs">
                  {tag}
                </AppBadge>
              ))}
            </div>

            {/* Title */}
            <h2 className="mb-3 line-clamp-2 text-lg font-semibold text-card-foreground transition-colors duration-200 group-hover:text-primary">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
              {post.excerpt}
            </p>
          </div>

          {/* Footer Meta + CTA */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <time dateTime={post.date}>{post.date}</time>
                {post.readingTime && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                    <span>
                      {typeof post.readingTime === "number"
                        ? post.readingTime
                        : post.readingTime.minutes}{" "}
                      phút đọc
                    </span>
                  </>
                )}
            </div>

            <span className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md">
              Đọc
              <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

