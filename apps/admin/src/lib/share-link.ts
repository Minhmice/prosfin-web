/**
 * Share Link Utilities
 * Utilities for copying and building shareable URLs
 */

import { toast } from "sonner"

/**
 * Build share URL with params
 */
export function buildShareUrl(
  path: string,
  params: Record<string, string | string[] | undefined>
): string {
  const searchParams = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return
    
    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, v))
    } else {
      searchParams.set(key, value)
    }
  })
  
  const queryString = searchParams.toString()
  const url = queryString ? `${path}?${queryString}` : path
  
  if (typeof window !== "undefined") {
    return `${window.location.origin}${url}`
  }
  
  return url
}

/**
 * Copy share link to clipboard with toast feedback
 */
export async function copyShareLink(
  path: string,
  params: Record<string, string | string[] | undefined> = {}
): Promise<void> {
  try {
    const url = buildShareUrl(path, params)
    
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url)
      toast.success("Link copied to clipboard")
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = url
      textArea.style.position = "fixed"
      textArea.style.opacity = "0"
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      toast.success("Link copied to clipboard")
    }
  } catch (error) {
    toast.error("Failed to copy link")
  }
}

