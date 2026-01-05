/**
 * Tools Library
 * 
 * Main entry point for tools framework.
 */

import { TOOLS } from "@/content/tools";
import type { ToolDefinition, ToolInput, ToolResult } from "@/types/tools";

/**
 * Get all tools
 */
export function getAllTools(): ToolDefinition[] {
  return TOOLS;
}

/**
 * Get tool by slug
 */
export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS.find((tool) => tool.slug === slug);
}

/**
 * Compute tool result
 */
export function computeTool(slug: string, input: ToolInput): ToolResult | null {
  const tool = getToolBySlug(slug);
  if (!tool) {
    return null;
  }

  try {
    // Validate input with schema
    const validatedInput = tool.inputs.schema.parse(input);
    return tool.compute(validatedInput);
  } catch (error) {
    console.error(`Error computing tool ${slug}:`, error);
    return null;
  }
}

/**
 * Get tool static params for generateStaticParams
 */
export function getToolStaticParams(): Array<{ slug: string }> {
  return TOOLS.map((tool) => ({
    slug: tool.slug,
  }));
}

