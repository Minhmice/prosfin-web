"use client";

import * as React from "react";
import { useInViewAnimation } from "@/hooks/use-in-view-animation";
import { cn } from "@/lib/utils";
import { H2 } from "@/components/shared";

export interface StoryBlock {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface CaseStudyScrollStoryProps {
  /**
   * Array of story blocks (Problem → Approach → Result)
   */
  blocks: StoryBlock[];
  /**
   * Additional className
   */
  className?: string;
}

/**
 * CaseStudyScrollStory - Scrollytelling component cho /case-studies/[slug]
 * 
 * Chia story thành 3 block: Problem → Approach → Result.
 * Dùng scroll-driven animation nhẹ để chuyển giữa các block (opacity/position).
 * 
 * @example
 * ```tsx
 * <CaseStudyScrollStory blocks={storyBlocks} />
 * ```
 */
export function CaseStudyScrollStory({
  blocks,
  className,
}: CaseStudyScrollStoryProps) {
  const [activeBlock, setActiveBlock] = React.useState<string | null>(null);
  const blockRefs = React.useRef<Record<string, HTMLElement | null>>({});

  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];

    blocks.forEach((block) => {
      const element = blockRefs.current[block.id];
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveBlock(block.id);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [blocks]);

  return (
    <div className={cn("space-y-16", className)}>
      {blocks.map((block, index) => {
        const isActive = activeBlock === block.id;
        const isBeforeActive =
          activeBlock &&
          blocks.findIndex((b) => b.id === activeBlock) > index;
        const isAfterActive =
          activeBlock &&
          blocks.findIndex((b) => b.id === activeBlock) < index;

        return (
          <div
            key={block.id}
            ref={(el) => {
              blockRefs.current[block.id] = el;
            }}
            className={cn(
              "transition-all duration-500",
              isActive
                ? "opacity-100 translate-y-0"
                : isBeforeActive || isAfterActive
                  ? "opacity-40 translate-y-4"
                  : "opacity-60 translate-y-2"
            )}
          >
            <H2 className="mb-6">{block.title}</H2>
            <div
              className={cn(
                "transition-opacity duration-500",
                isActive ? "opacity-100" : "opacity-70"
              )}
            >
              {block.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}

