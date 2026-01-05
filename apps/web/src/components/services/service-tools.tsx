/**
 * ServiceTools - Tools you can run section for service page
 * 
 * Display recommended tools for a service.
 */

import { getRecommendedTools } from "@/lib/recommendations/tool-reco";
import { ProsfinSectionHeading } from "@/components/shared/section/section-heading-block";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProsfinSecondaryButton } from "@/components/shared/button/secondary-button";

interface ServiceToolsProps {
  serviceSlug: string;
}

/**
 * ServiceTools - Display recommended tools for service
 */
export function ServiceTools({ serviceSlug }: ServiceToolsProps) {
  const tools = getRecommendedTools(serviceSlug);

  if (tools.length === 0) return null;

  return (
    <div className="space-y-6">
      <ProsfinSectionHeading
        title="Công cụ bạn có thể sử dụng"
        subtitle="Chạy các công cụ tính toán để đánh giá tình hình tài chính của doanh nghiệp"
        align="left"
        titleSize="lg"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link key={tool.slug} href={tool.href}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">{tool.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ProsfinSecondaryButton href={tool.href} className="w-full">
                  Sử dụng công cụ
                </ProsfinSecondaryButton>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

