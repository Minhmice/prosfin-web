/**
 * Client 360 Files Tab
 */

"use client"

import * as React from "react"
import { Plus, Download, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import type { File } from "@/features/crm/types"

interface Client360FilesProps {
  clientId: string
  files: File[]
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function Client360Files({ clientId, files }: Client360FilesProps) {
  const [isUploadOpen, setIsUploadOpen] = React.useState(false)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Files</h3>
        <Button size="sm" onClick={() => setIsUploadOpen(true)}>
          <Plus className="mr-2 size-4" />
          Upload
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No files yet
          </div>
        ) : (
          files.map((file) => (
            <Card key={file.id}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{file.name}</div>
                    <div className="text-muted-foreground text-xs mt-1">
                      {formatFileSize(file.size)} • {format(file.createdAt, "MMM d, yyyy")}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      Uploaded by {file.uploadedByName}
                    </div>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <Button variant="ghost" size="icon" className="size-8">
                      <Download className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8">
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      {/* TODO: Upload Dialog */}
    </div>
  )
}

