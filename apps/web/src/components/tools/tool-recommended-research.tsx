/**
 * ToolRecommendedResearch - Recommended research posts from tool result
 * 
 * Display recommended research posts.
 */

import type { ToolResult } from "@/types/tools";
import { getRecommendedPosts } from "@/lib/recommendations/tool-reco";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ToolRecommendedResearchProps {
  result: ToolResult;
}

/**
 * ToolRecommendedResearch - Display recommended research posts
 */
export function ToolRecommendedResearch({ result }: ToolRecommendedResearchProps) {
  const posts = getRecommendedPosts(result);

  if (posts.length === 0) return null;

  return (
    <div className="space-y-6">
      <ProsfinSectionHeading
        title="Bài viết liên quan"
        subtitle="Đọc thêm về các chủ đề liên quan đến kết quả phân tích"
        align="left"
        titleSize="lg"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.id} href={post.href}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Đọc thêm →</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

