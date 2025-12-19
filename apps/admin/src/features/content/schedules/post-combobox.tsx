"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
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
import { cn } from "@/lib/utils"
import { contentProvider } from "../../data/provider"
import type { Post } from "../../types"

interface PostComboboxProps {
  value?: string
  onValueChange: (postId: string) => void
  disabled?: boolean
}

export function PostCombobox({
  value,
  onValueChange,
  disabled,
}: PostComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [posts, setPosts] = React.useState<Post[]>([])
  const [searchQuery, setSearchQuery] = React.useState("")

  React.useEffect(() => {
    const loadPosts = async () => {
      const result = await contentProvider.listPosts({
        q: searchQuery || undefined,
        page: 1,
        pageSize: 20,
      })
      setPosts(result.data)
    }
    loadPosts()
  }, [searchQuery])

  const selectedPost = posts.find((p) => p.id === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {selectedPost ? (
            <div className="flex items-center gap-2">
              <span className="truncate">{selectedPost.title}</span>
              <Badge variant="outline" className="text-xs">
                {selectedPost.status}
              </Badge>
            </div>
          ) : (
            "Select post..."
          )}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search posts..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No posts found.</CommandEmpty>
            <CommandGroup>
              {posts.map((post) => (
                <CommandItem
                  key={post.id}
                  value={post.id}
                  onSelect={() => {
                    onValueChange(post.id)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === post.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{post.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {post.slug}
                    </div>
                  </div>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {post.status}
                  </Badge>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
