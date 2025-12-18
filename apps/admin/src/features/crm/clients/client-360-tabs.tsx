/**
 * Client 360 Tabs
 * Overview, Leads, Notes, Tasks, Files
 */

"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { crmProvider } from "../data/provider"
import type { Client360 } from "../types"
import { Client360Overview } from "./client-360-overview"
import { Client360Leads } from "./client-360-leads"
import { Client360Notes } from "./client-360-notes"
import { Client360Tasks } from "./client-360-tasks"
import { Client360Files } from "./client-360-files"

interface Client360TabsProps {
  clientId: string
}

export function Client360Tabs({ clientId }: Client360TabsProps) {
  const [data, setData] = React.useState<Client360 | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const result = await crmProvider.getClient360(clientId)
        setData(result)
      } catch (error) {
        console.error("Failed to fetch client 360:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [clientId])

  if (isLoading) {
    return <div className="py-8 text-center text-muted-foreground">Loading...</div>
  }

  if (!data) {
    return <div className="py-8 text-center text-muted-foreground">Failed to load data</div>
  }

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="leads">Leads</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="tasks">Tasks</TabsTrigger>
        <TabsTrigger value="files">Files</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4">
        <Client360Overview client={data.client} />
      </TabsContent>
      <TabsContent value="leads" className="mt-4">
        <Client360Leads leads={data.relatedLeads} />
      </TabsContent>
      <TabsContent value="notes" className="mt-4">
        <Client360Notes clientId={clientId} notes={data.notes} />
      </TabsContent>
      <TabsContent value="tasks" className="mt-4">
        <Client360Tasks clientId={clientId} tasks={data.tasks} />
      </TabsContent>
      <TabsContent value="files" className="mt-4">
        <Client360Files clientId={clientId} files={data.files} />
      </TabsContent>
    </Tabs>
  )
}

