/**
 * ToolsHubSearch - Search and filter tools
 */

"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { ToolCard } from "./tool-card";
import type { ToolDefinition } from "@/types/tools";
import { cn } from "@/lib/utils";

interface ToolsHubSearchProps {
  tools: ToolDefinition[];
}

/**
 * ToolsHubSearch - Search and filter tools
 */
export function ToolsHubSearch({ tools }: ToolsHubSearchProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const categories = Array.from(new Set(tools.map((t) => t.category)));

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      searchQuery === "" ||
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === null || tool.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <Input
          placeholder="Tìm kiếm công cụ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition-colors",
              selectedCategory === null
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            )}
          >
            Tất cả
          </button>
          {categories.map((category) => {
            const labels: Record<string, string> = {
              calculator: "Máy tính",
              assessment: "Đánh giá",
              analysis: "Phân tích",
            };
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                {labels[category] || category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          Không tìm thấy công cụ nào
        </div>
      )}
    </div>
  );
}

