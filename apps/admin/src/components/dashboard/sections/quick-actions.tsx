"use client"

import { IconPlus, IconFileText, IconBuilding } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function QuickActions() {
  const handleNewLead = () => {
    // Will be handled by context in Phase 1.5
    console.log("New Lead")
  }

  const handleNewClient = () => {
    // Will be handled by context in Phase 1.5
    console.log("New Client")
  }

  const handleCreatePost = () => {
    // Phase 2
    console.log("Create Post")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleNewLead}
          >
            <IconPlus className="mr-2 size-4" />
            New Lead
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleNewClient}
          >
            <IconBuilding className="mr-2 size-4" />
            New Client
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleCreatePost}
          >
            <IconFileText className="mr-2 size-4" />
            Create Post
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
