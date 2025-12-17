import type { Media, MediaFilters, MediaType } from "@/types/media";
import { mockMedia } from "@/mocks/media";

/**
 * Data adapter cho Media
 */

let mediaData: Media[] = [...mockMedia];

export async function listMedia(filters?: MediaFilters): Promise<Media[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  let filtered = [...mediaData];

  if (filters) {
    if (filters.type && filters.type.length > 0) {
      filtered = filtered.filter((media) => filters.type!.includes(media.type));
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter((media) =>
        filters.tags!.some((tag) => media.tags.includes(tag))
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (media) =>
          media.filename.toLowerCase().includes(searchLower) ||
          media.alt?.toLowerCase().includes(searchLower) ||
          media.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }
  }

  return filtered;
}

export async function getMedia(id: string): Promise<Media | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return mediaData.find((media) => media.id === id) || null;
}

export async function updateMedia(id: string, updates: Partial<Media>): Promise<Media> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const media = mediaData.find((m) => m.id === id);
  if (!media) {
    throw new Error(`Media with id ${id} not found`);
  }

  const updated: Media = {
    ...media,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  mediaData = mediaData.map((m) => (m.id === id ? updated : m));
  return updated;
}

export async function getAllMediaTags(): Promise<string[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const allTags = mediaData.flatMap((media) => media.tags);
  return Array.from(new Set(allTags)).sort();
}

