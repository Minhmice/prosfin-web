/**
 * Share Link Button
 * Copy current URL (pathname + search params) to clipboard
 */

"use client"

import * as React from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Share2, Check } from "lucide-react"
import { toast } from "sonner"

export function ShareLinkButton() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [copied, setCopied] = React.useState(false)

  const handleCopy = React.useCallback(async () => {
    try {
      const url = `${window.location.origin}${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success("Link copied to clipboard")
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error("Failed to copy link")
    }
  }, [pathname, searchParams])

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      aria-label="Copy share link"
    >
      {copied ? (
        <>
          <Check className="mr-2 size-4" />
          Copied
        </>
      ) : (
        <>
          <Share2 className="mr-2 size-4" />
          Share
        </>
      )}
    </Button>
  )
}

