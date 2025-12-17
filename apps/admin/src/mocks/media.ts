import type { Media } from "@/types/media";

/**
 * Mock media data
 */

export const mockMedia: Media[] = [
  {
    id: "media-1",
    filename: "prosfin-logo.svg",
    url: "/brand/prosfin-logo.svg",
    type: "image",
    mimeType: "image/svg+xml",
    width: 200,
    height: 50,
    alt: "ProsFin Logo",
    caption: "Company logo",
    tags: ["logo", "brand"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "media-2",
    filename: "logo-rectangle.svg",
    url: "/brand/logo_rectangle.svg",
    type: "image",
    mimeType: "image/svg+xml",
    width: 300,
    height: 100,
    alt: "ProsFin Rectangle Logo",
    tags: ["logo", "brand"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  // Generate more mock media
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `media-${i + 3}`,
    filename: `image-${i + 1}.jpg`,
    url: `https://via.placeholder.com/${400 + i * 50}x${300 + i * 30}`,
    type: "image" as const,
    mimeType: "image/jpeg",
    width: 400 + i * 50,
    height: 300 + i * 30,
    size: (100000 + i * 5000),
    alt: `Placeholder image ${i + 1}`,
    tags: ["placeholder", i % 3 === 0 ? "featured" : "general"],
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - i * 86400000).toISOString(),
  })),
];

