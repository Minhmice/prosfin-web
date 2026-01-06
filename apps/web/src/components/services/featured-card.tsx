"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/types/content";
import { cn } from "@/lib/utils";
import { AppBadge } from "@/components/shared/wrappers/app-badge";

interface FeaturedCardProps {
  post: Post;
  className?: string;
}

/**
 * FeaturedCard - Component hiển thị featured post card
 * 
 * Card đẹp với layout 2 cột (image + content) cho featured posts.
 * Sử dụng theme colors của web (bg-card, text-card-foreground, border, primary).
 * Toàn bộ card có thể click để đi đến bài viết.
 */
export function FeaturedCard({ post, className }: FeaturedCardProps) {
  return (
    <Link
      href={post.href}
      className={cn(
        "group col-span-full block overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:col-span-2",
        className
      )}
      aria-label={`Đọc bài viết: ${post.title}`}
    >
      <article className="flex min-h-[544px] flex-col md:flex-row">
        {/* Featured Image - Full scale from top to bottom */}
        <div className="relative min-h-[300px] w-full shrink-0 overflow-hidden bg-muted md:min-h-full md:w-1/2">
          <div className="absolute left-4 top-4 z-20">
            <AppBadge badgeVariant="primary" className="gap-1.5 px-3 py-1.5 text-xs font-semibold shadow-lg">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              Featured
            </AppBadge>
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="h-full w-full bg-muted" />
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
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
            <h2 className="mb-4 line-clamp-2 text-lg font-semibold text-card-foreground transition-colors duration-200 group-hover:text-primary md:text-xl">
              {post.title}
            </h2>

            {/* Longer Excerpt for Featured */}
            <p className="mb-6 line-clamp-4 text-sm text-muted-foreground md:text-base">
              {post.excerpt}
            </p>
          </div>

          {/* Footer Meta + CTA */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
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
            </div>

            <span className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md">
              Đọc bài viết
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

