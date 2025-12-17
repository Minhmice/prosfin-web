"use client";

import * as React from "react";
import { AdminPageShell, Input, Button, Textarea, Label, Badge } from "@prosfin/ui";
import { Search, Upload, X } from "lucide-react";
import { MediaGrid } from "@/components/content/media-library/media-grid";
import { listMedia, updateMedia, getAllMediaTags } from "@/lib/data/media";
import type { Media, MediaType } from "@/types/media";

export default function MediaPage() {
  const [media, setMedia] = React.useState<Media[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [selectedType, setSelectedType] = React.useState<MediaType[]>([]);
  const [selectedMedia, setSelectedMedia] = React.useState<Media | null>(null);
  const [altText, setAltText] = React.useState("");
  const [caption, setCaption] = React.useState("");

  React.useEffect(() => {
    loadMedia();
  }, [search, selectedType]);

  const loadMedia = async () => {
    setIsLoading(true);
    const data = await listMedia({
      search: search || undefined,
      type: selectedType.length > 0 ? selectedType : undefined,
    });
    setMedia(data);
    setIsLoading(false);
  };

  React.useEffect(() => {
    if (selectedMedia) {
      setAltText(selectedMedia.alt || "");
      setCaption(selectedMedia.caption || "");
    }
  }, [selectedMedia]);

  const handleSaveMedia = async () => {
    if (!selectedMedia) return;
    await updateMedia(selectedMedia.id, {
      alt: altText,
      caption: caption,
    });
    await loadMedia();
    const updated = media.find((m) => m.id === selectedMedia.id);
    if (updated) setSelectedMedia(updated);
  };

  const types: MediaType[] = ["image", "video", "document", "other"];

  return (
    <AdminPageShell title="Media Library" description="Manage your media assets">
      <div className="flex gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search media..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              {types.map((type) => (
                <Button
                  key={type}
                  variant={selectedType.includes(type) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedType((prev) =>
                      prev.includes(type)
                        ? prev.filter((t) => t !== type)
                        : [...prev, type]
                    );
                  }}
                >
                  {type}
                </Button>
              ))}
            </div>
            <Button>
              <Upload className="mr-2 size-4" />
              Upload
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading...</div>
          ) : (
            <MediaGrid
              media={media}
              onMediaClick={setSelectedMedia}
            />
          )}
        </div>

        {selectedMedia && (
          <div className="w-80 space-y-4 border-l p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Media Details</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedMedia(null)}
              >
                <X className="size-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {selectedMedia.type === "image" && (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.alt || selectedMedia.filename}
                  className="w-full rounded-lg"
                />
              )}

              <div className="space-y-2">
                <Label htmlFor="filename">Filename</Label>
                <Input id="filename" value={selectedMedia.filename} disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="alt">
                  Alt Text <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="alt"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Describe the image"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="caption">Caption</Label>
                <Textarea
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Optional caption"
                  rows={3}
                />
              </div>

              {selectedMedia.width && selectedMedia.height && (
                <div className="text-sm text-muted-foreground">
                  Dimensions: {selectedMedia.width} × {selectedMedia.height}px
                </div>
              )}

              {selectedMedia.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {selectedMedia.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <Button onClick={handleSaveMedia} className="w-full" disabled={!altText.trim()}>
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </div>
    </AdminPageShell>
  );
}
