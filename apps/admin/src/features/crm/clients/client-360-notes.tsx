/**
 * Client 360 Notes Tab
 */

"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import type { Note } from "@/features/crm/types"

interface Client360NotesProps {
  clientId: string
  notes: Note[]
}

export function Client360Notes({ clientId, notes }: Client360NotesProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Notes</h3>
        <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 size-4" />
          Add Note
        </Button>
      </div>
      <div className="space-y-3">
        {notes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No notes yet</div>
        ) : (
          notes.map((note) => (
            <Card key={note.id}>
              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm text-muted-foreground">
                    {note.authorName} • {format(note.createdAt, "MMM d, yyyy")}
                  </div>
                </div>
                <p className="text-sm">{note.content}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      {/* TODO: Add Note Dialog */}
    </div>
  )
}

