/**
 * Media Types
 */

export type MediaType = "image" | "video" | "file"

export interface MediaAsset {
  id: string
  type: MediaType
  name: string
  size: number
  mime: string
  url: string
  key: string
  width?: number
  height?: number
  createdBy: string
  createdAt: Date
}

