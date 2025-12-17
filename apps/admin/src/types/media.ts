/**
 * Media Types
 */

export type MediaType = "image" | "video" | "document" | "other";

export interface Media {
  id: string;
  filename: string;
  url: string;
  type: MediaType;
  mimeType?: string;
  size?: number; // bytes
  width?: number; // pixels (for images)
  height?: number; // pixels (for images)
  alt?: string;
  caption?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MediaFilters {
  type?: MediaType[];
  tags?: string[];
  search?: string;
}

