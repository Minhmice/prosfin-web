"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"
import { Check, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { contentProvider } from "@/features/content/data/provider"
import type { Tag } from "@/features/content/types"
import type { PostFormData } from "@/features/content/schemas"
import { cn } from "@/lib/utils"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export function TagsCombobox() {
  const form = useFormContext<PostFormData>()
  const [tags, setTags] = React.useState<Tag[]>([])
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  React.useEffect(() => {
    const loadTags = async () => {
      const result = await contentProvider.listTags({ q: searchQuery })
      setTags(result)
    }
    loadTags()
  }, [searchQuery])

  const selectedTags = form.watch("tags") || []

  const handleSelect = (tagSlug: string) => {
    const current = selectedTags
    if (current.includes(tagSlug)) {
      form.setValue("tags", current.filter((t) => t !== tagSlug))
    } else {
      form.setValue("tags", [...current, tagSlug])
    }
  }

  const handleCreateNew = async () => {
    if (!searchQuery.trim()) return

    const slug = slugify(searchQuery)
    if (selectedTags.includes(slug)) {
      setSearchQuery("")
      return
    }

    try {
      await contentProvider.createTag({
        name: searchQuery,
        slug,
      })
      form.setValue("tags", [...selectedTags, slug])
      setSearchQuery("")
      const result = await contentProvider.listTags({})
      setTags(result)
    } catch (error) {
      // Silent fail
    }
  }

  const handleRemove = (tagSlug: string) => {
    form.setValue("tags", selectedTags.filter((t) => t !== tagSlug))
  }

  return (
    <FormField
      control={form.control}
      name="tags"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tags</FormLabel>
          <div className="space-y-2">
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tagSlug) => {
                  const tag = tags.find((t) => t.slug === tagSlug)
                  return (
                    <Badge key={tagSlug} variant="secondary" className="gap-1">
                      {tag?.name || tagSlug}
                      <button
                        type="button"
                        onClick={() => handleRemove(tagSlug)}
                        className="ml-1 hover:bg-destructive/20 rounded-full"
                      >
                        <X className="size-3" />
                      </button>
                    </Badge>
                  )
                })}
              </div>
            )}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    Add tags...
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0" align="start">
                <Command>
                  <CommandInput
                    placeholder="Search or create tag..."
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                  />
                  <CommandList>
                    <CommandEmpty>
                      <div className="py-2 px-4">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={handleCreateNew}
                        >
                          <Plus className="mr-2 size-4" />
                          Create "{searchQuery}"
                        </Button>
                      </div>
                    </CommandEmpty>
                    <CommandGroup>
                      {tags.map((tag) => (
                        <CommandItem
                          key={tag.id}
                          value={tag.name}
                          onSelect={() => handleSelect(tag.slug)}
                        >
                          <Check
                            className={cn(
                              "mr-2 size-4",
                              selectedTags.includes(tag.slug)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {tag.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </FormItem>
      )}
    />
  )
}
