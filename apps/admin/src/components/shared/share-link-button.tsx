"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { IconLink } from "@tabler/icons-react"
import { copyShareLink } from "@/lib/share-link"
import type { ContentListParams } from "@/lib/url-state-content"

interface ShareLinkButtonProps {
  path: string
  params?: ContentListParams
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export function ShareLinkButton({
  path,
  params = {},
  variant = "outline",
  size = "default",
}: ShareLinkButtonProps) {
  const handleCopy = async () => {
    await copyShareLink(path, params as Record<string, string | string[] | undefined>)
  }

  return (
    <Button variant={variant} size={size} onClick={handleCopy}>
      <IconLink className="mr-2 size-4" />
      Copy Link
    </Button>
  )
}

