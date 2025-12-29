"use client"

import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import type { MediaAsset } from "@/features/content/types"
import { contentProvider } from "@/features/content/data/provider"
import { toast } from "sonner"

interface MediaMetadataSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  media: MediaAsset | null
  onSave?: () => void
}

export function MediaMetadataSheet({
  open,
  onOpenChange,
  media,
  onSave,
}: MediaMetadataSheetProps) {
  const [title, setTitle] = React.useState("")
  const [altText, setAltText] = React.useState("")
  const [tags, setTags] = React.useState<string[]>([])
  const [tagInput, setTagInput] = React.useState("")
  const [source, setSource] = React.useState("")
  const [license, setLicense] = React.useState("")
  const [isSaving, setIsSaving] = React.useState(false)

  React.useEffect(() => {
    if (media) {
      setTitle(media.title || "")
      setAltText(media.altText || "")
      setTags(media.tags || [])
      setSource(media.source || "")
      setLicense(media.license || "")
    }
  }, [media])

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSave = async () => {
    if (!media) return

    setIsSaving(true)
    try {
      await contentProvider.updateMedia(media.id, {
        title: title || undefined,
        altText: altText || undefined,
        tags,
        source: source || undefined,
        license: license || undefined,
      })
      toast.success("Media metadata updated")
      onSave?.()
      onOpenChange(false)
    } catch (error) {
      toast.error("Failed to update metadata")
    } finally {
      setIsSaving(false)
    }
  }

  if (!media) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[540px]">
        <SheetHeader>
          <SheetTitle>Edit Media Metadata</SheetTitle>
          <SheetDescription>
            Update metadata for {media.name}
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter media title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="altText">Alt Text</Label>
            <Textarea
              id="altText"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Describe the image for accessibility"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
                placeholder="Add a tag"
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:bg-muted rounded"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="e.g., Unsplash, Pexels"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="license">License</Label>
            <Input
              id="license"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              placeholder="e.g., CC BY 4.0"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

