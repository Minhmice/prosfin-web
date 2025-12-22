/**
 * Tags Multi-Select
 * Select multiple tags from available list
 */

"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
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

// Available tags (in real app, this would come from API)
const availableTags = ["vip", "enterprise", "startup", "sme"]

interface TagsMultiSelectProps {
  value?: string[]
  onValueChange: (value: string[]) => void
  placeholder?: string
}

export function TagsMultiSelect({
  value = [],
  onValueChange,
  placeholder = "Select tags...",
}: TagsMultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const selectedTags = React.useMemo(
    () => availableTags.filter((tag) => value.includes(tag)),
    [value]
  )

  const handleToggle = (tag: string) => {
    const newValue = value.includes(tag)
      ? value.filter((t) => t !== tag)
      : [...value, tag]
    onValueChange(newValue)
  }

  const handleRemove = (tag: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onValueChange(value.filter((t) => t !== tag))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedTags.length > 0
            ? `${selectedTags.length} selected`
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search tags..." />
          <CommandList>
            <CommandEmpty>No tag found.</CommandEmpty>
            <CommandGroup>
              {availableTags.map((tag) => (
                <CommandItem
                  key={tag}
                  value={tag}
                  onSelect={() => handleToggle(tag)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(tag) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {tag}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

/**
 * Tags Display Component
 * Shows selected tags as badges with remove buttons
 */
export function TagsDisplay({
  tags,
  onRemove,
}: {
  tags: string[]
  onRemove: (tag: string) => void
}) {
  if (tags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary" className="gap-1">
          {tag}
          <button
            onClick={() => onRemove(tag)}
            className="ml-1 rounded-full hover:bg-secondary"
            aria-label={`Remove ${tag}`}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  )
}

