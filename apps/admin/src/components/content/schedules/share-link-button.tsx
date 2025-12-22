"use client"

import * as React from "react"
import { Share2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface ShareLinkButtonProps {
  className?: string
}

export function ShareLinkButton({ className }: ShareLinkButtonProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      toast.success("Link copied to clipboard")
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {
      toast.error("Failed to copy link")
    })
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className={className}
    >
      {copied ? (
        <>
          <Check className="mr-2 size-4" />
          Copied
        </>
      ) : (
        <>
          <Share2 className="mr-2 size-4" />
          Share Link
        </>
      )}
    </Button>
  )
}
