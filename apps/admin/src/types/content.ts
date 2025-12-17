/**
 * Content Types
 * 
 * Type definitions cho CMS content (Posts)
 */

/**
 * Lexical editor state (JSON format)
 * Will be replaced with proper Lexical EditorState type after installation
 */
export type LexicalEditorState = {
  root: {
    children: Array<Record<string, any>>;
    direction: "ltr" | "rtl" | null;
    format: string;
    indent: number;
    type: "root";
    version: number;
  };
};

/**
 * Content buckets
 */
export type ContentBucket = "insights" | "resources" | "knowledge";

/**
 * Post statuses
 */
export type PostStatus = "draft" | "published" | "scheduled" | "archived";

/**
 * Post interface
 */
export interface Post {
  id: string;
  bucket: ContentBucket;
  title: string;
  slug: string;
  excerpt?: string;
  cover?: string;
  tags: string[];
  content: LexicalEditorState; // Lexical JSON state
  seoTitle?: string;
  seoDescription?: string;
  canonical?: string;
  noindex?: boolean;
  publishedAt?: string;
  updatedAt: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  status: PostStatus;
  scheduledFor?: string; // ISO date string for scheduled posts
}

/**
 * Post filters for list view
 */
export interface PostFilters {
  status?: PostStatus[];
  bucket?: ContentBucket[];
  tags?: string[];
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

/**
 * Post form data (for editor)
 */
export interface PostFormData {
  title: string;
  slug: string;
  bucket: ContentBucket;
  excerpt?: string;
  cover?: string;
  tags: string[];
  content: LexicalEditorState;
  seoTitle?: string;
  seoDescription?: string;
  canonical?: string;
  noindex?: boolean;
  status: PostStatus;
  scheduledFor?: string;
}

/**
 * Zod validation schemas
 */
import { z } from "zod";

export const contentBucketSchema = z.enum(["insights", "resources", "knowledge"]);

export const postStatusSchema = z.enum(["draft", "published", "scheduled", "archived"]);

export const lexicalEditorStateSchema: z.ZodType<any> = z.object({
  root: z.object({
    children: z.array(z.any()),
    direction: z.enum(["ltr", "rtl"]).nullable(),
    format: z.string(),
    indent: z.number(),
    type: z.literal("root"),
    version: z.number(),
  }),
});

export const postFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200, "Slug is too long")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  bucket: contentBucketSchema,
  excerpt: z.string().max(500, "Excerpt is too long").optional(),
  cover: z.string().url("Cover must be a valid URL").optional().or(z.literal("")),
  tags: z.array(z.string()).default([]),
  content: lexicalEditorStateSchema,
  seoTitle: z.string().max(60, "SEO title is too long").optional(),
  seoDescription: z.string().max(160, "SEO description is too long").optional(),
  canonical: z.string().url("Canonical must be a valid URL").optional().or(z.literal("")),
  noindex: z.boolean().optional(),
  status: postStatusSchema,
  scheduledFor: z.string().datetime().optional(),
});

export type PostFormSchema = z.infer<typeof postFormSchema>;

