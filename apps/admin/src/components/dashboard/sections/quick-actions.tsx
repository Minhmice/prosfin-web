"use client"

import { useRouter } from "next/navigation"
import { IconPlus, IconFileText, IconDownload } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { notifyInfo } from "@/lib/notify"

export function QuickActions() {
  const router = useRouter()

  const handleNewLead = () => {
    router.push("/leads")
    notifyInfo("Navigating to Leads", "You can create a new lead there")
  }

  const handleCreatePost = () => {
    router.push("/content")
    notifyInfo("Navigating to Content", "You can create a new post there")
  }

  const handleExportLeads = () => {
    notifyInfo("Export Leads", "This feature will be available soon")
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
            onClick={handleCreatePost}
          >
            <IconFileText className="mr-2 size-4" />
            Create Post
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleExportLeads}
          >
            <IconDownload className="mr-2 size-4" />
            Export Leads
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
