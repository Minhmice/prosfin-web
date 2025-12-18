/**
 * Client 360 Tasks Tab
 */

"use client"

import * as React from "react"
import { Plus, CheckCircle2, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import type { Task } from "@/features/crm/types"

interface Client360TasksProps {
  clientId: string
  tasks: Task[]
}

export function Client360Tasks({ clientId, tasks }: Client360TasksProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)

  const getStatusBadge = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return <Badge variant="default">Completed</Badge>
      case "in_progress":
        return <Badge variant="secondary">In Progress</Badge>
      default:
        return <Badge variant="outline">Todo</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Tasks</h3>
        <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 size-4" />
          Add Task
        </Button>
      </div>
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No tasks yet</div>
        ) : (
          tasks.map((task) => (
            <Card key={task.id}>
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {task.status === "completed" ? (
                      <CheckCircle2 className="size-5 text-green-500" />
                    ) : (
                      <Circle className="size-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium">{task.title}</h4>
                      {getStatusBadge(task.status)}
                    </div>
                    {task.description && (
                      <p className="text-muted-foreground text-sm mb-2">{task.description}</p>
                    )}
                    <div className="flex gap-4 text-muted-foreground text-xs">
                      {task.dueDate && (
                        <span>Due: {format(task.dueDate, "MMM d, yyyy")}</span>
                      )}
                      {task.assignedToName && <span>Assigned to: {task.assignedToName}</span>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      {/* TODO: Add Task Dialog */}
    </div>
  )
}

