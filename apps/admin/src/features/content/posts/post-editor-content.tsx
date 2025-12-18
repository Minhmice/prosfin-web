"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"

interface PostEditorContentProps {
  value: string
  onChange: (value: string) => void
}

export function PostEditorContent({
  value,
  onChange,
}: PostEditorContentProps) {
  return (
    <Tabs defaultValue="write" className="w-full">
      <TabsList>
        <TabsTrigger value="write">Write</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>
      <TabsContent value="write" className="mt-4">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Start writing your post content in Markdown..."
          className="min-h-[400px] font-mono text-sm"
        />
      </TabsContent>
      <TabsContent value="preview" className="mt-4">
        <Card>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none p-6">
            {value ? (
              <ReactMarkdown>{value}</ReactMarkdown>
            ) : (
              <p className="text-muted-foreground">No content to preview</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
