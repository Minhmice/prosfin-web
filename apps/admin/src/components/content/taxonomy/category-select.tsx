"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { CategoryManagerDialog } from "./category-manager-dialog"
import { contentProvider } from "@/features/content/data/provider"
import type { Category } from "@/features/content/types"
import type { PostFormData } from "@/features/content/schemas"

export function CategorySelect() {
  const form = useFormContext<PostFormData>()
  const [categories, setCategories] = React.useState<Category[]>([])
  const [isManagerOpen, setIsManagerOpen] = React.useState(false)

  React.useEffect(() => {
    const loadCategories = async () => {
      const cats = await contentProvider.listCategories()
      setCategories(cats)
    }
    loadCategories()
  }, [])

  const handleManagerClose = () => {
    setIsManagerOpen(false)
    // Reload categories
    contentProvider.listCategories().then(setCategories)
  }

  return (
    <>
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>Category</FormLabel>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsManagerOpen(true)}
              >
                <Settings className="mr-2 size-4" />
                Manage
              </Button>
            </div>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.slug}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <CategoryManagerDialog
        open={isManagerOpen}
        onOpenChange={handleManagerClose}
      />
    </>
  )
}
