/**
 * ToolCard - Card component for displaying tool in hub
 */

import Link from "next/link";
import type { ToolDefinition } from "@/types/tools";
import { ProsfinServiceCardWrapper } from "@/components/shared/card/service-card-wrapper";
import { ProsfinSecondaryButton } from "@/components/shared/button/secondary-button";
import { AppBadge } from "@/components/shared/wrappers/app-badge";

interface ToolCardProps {
  tool: ToolDefinition;
}

/**
 * ToolCard - Display tool in hub grid
 */
export function ToolCard({ tool }: ToolCardProps) {
  const categoryLabels: Record<ToolDefinition["category"], string> = {
    calculator: "Máy tính",
    assessment: "Đánh giá",
    analysis: "Phân tích",
  };

  return (
    <Link href={`/tools/${tool.slug}`} className="block">
      <ProsfinServiceCardWrapper
        title={tool.title}
        description={tool.shortDescription || tool.description}
        cta={
          <ProsfinSecondaryButton href={`/tools/${tool.slug}`} className="w-full">
            Sử dụng công cụ
          </ProsfinSecondaryButton>
        }
      >
        <div className="flex items-center gap-2">
          {tool.icon && <span className="text-2xl">{tool.icon}</span>}
          <AppBadge variant="outline" className="text-xs">
            {categoryLabels[tool.category]}
          </AppBadge>
        </div>
      </ProsfinServiceCardWrapper>
    </Link>
  );
}

