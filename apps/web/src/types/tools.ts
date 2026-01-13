/**
 * Tool Types
 * 
 * Type definitions for finance tools framework.
 */

import type { z } from "zod";

/**
 * Tool Metric - KPI metric với threshold
 */
export interface ToolMetric {
  name: string;
  label: string;
  value: number | string;
  unit?: string;
  threshold?: {
    green: number;
    amber: number;
    red: number;
  };
  description?: string;
}

/**
 * Tool Flag - Warning/alert flag
 */
export interface ToolFlag {
  type: "warning" | "error" | "info" | "success";
  severity: "low" | "medium" | "high";
  message: string;
  action?: {
    label: string;
    href: string;
  };
}

/**
 * Tool Recommendation - Recommended action
 */
export interface ToolRecommendation {
  type: "service" | "post" | "tool" | "general";
  title: string;
  description: string;
  href: string;
  priority?: "high" | "medium" | "low";
}

/**
 * Tool Result - Output từ tool computation
 */
export interface ToolResult {
  metrics: ToolMetric[];
  flags: ToolFlag[];
  recommendations: ToolRecommendation[];
  recommendedServiceSlugs: string[];
  recommendedPostIds: string[];
  summary?: string;
  insights?: string[];
}

/**
 * Tool Input Schema - Zod schema cho validation
 */
export type ToolInputSchema = z.ZodObject<z.ZodRawShape>;

/**
 * Tool Input - Generic input type
 */
export type ToolInput = Record<string, unknown>;

/**
 * Tool SEO Metadata
 */
export interface ToolSEO {
  title: string;
  description: string;
  keywords?: string[];
}

/**
 * Tool Definition - Complete tool configuration
 */
export interface ToolDefinition {
  slug: string;
  title: string;
  description: string;
  shortDescription?: string;
  category: "calculator" | "assessment" | "analysis";
  icon?: string;
  inputs: {
    schema: ToolInputSchema;
    fields: Array<{
      name: string;
      label: string;
      type: "number" | "text" | "select" | "checkbox" | "radio";
      placeholder?: string;
      helpText?: string;
      required?: boolean;
      min?: number;
      max?: number;
      options?: Array<{ value: string; label: string }>;
    }>;
    presets?: Array<{
      name: string;
      label: string;
      values: ToolInput;
    }>;
  };
  compute: (input: ToolInput) => ToolResult;
  insights?: (result: ToolResult) => string[];
  cta?: {
    label: string;
    href: string;
  };
  seo: ToolSEO;
}

