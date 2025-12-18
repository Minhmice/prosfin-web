/**
 * Client 360 Overview Tab
 */

import type { Client } from "@/features/crm/types"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Client360OverviewProps {
  client: Client
}

export function Client360Overview({ client }: Client360OverviewProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-muted-foreground text-sm">Name</div>
              <div className="font-medium">{client.name}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-sm">Company</div>
              <div className="font-medium">{client.company}</div>
            </div>
            {client.title && (
              <div>
                <div className="text-muted-foreground text-sm">Title</div>
                <div className="font-medium">{client.title}</div>
              </div>
            )}
            <div>
              <div className="text-muted-foreground text-sm">Status</div>
              <Badge variant={client.status === "active" ? "default" : "secondary"}>
                {client.status}
              </Badge>
            </div>
            <div>
              <div className="text-muted-foreground text-sm">Email</div>
              <div className="font-medium">{client.email}</div>
            </div>
            {client.phone && (
              <div>
                <div className="text-muted-foreground text-sm">Phone</div>
                <div className="font-medium">{client.phone}</div>
              </div>
            )}
            {client.ownerName && (
              <div>
                <div className="text-muted-foreground text-sm">Owner</div>
                <div className="font-medium">{client.ownerName}</div>
              </div>
            )}
            {client.lastContactedAt && (
              <div>
                <div className="text-muted-foreground text-sm">Last Contacted</div>
                <div className="font-medium">{format(client.lastContactedAt, "MMM d, yyyy")}</div>
              </div>
            )}
            <div>
              <div className="text-muted-foreground text-sm">Created</div>
              <div className="font-medium">{format(client.createdAt, "MMM d, yyyy")}</div>
            </div>
          </div>
          {client.tags && client.tags.length > 0 && (
            <div>
              <div className="text-muted-foreground mb-2 text-sm">Tags</div>
              <div className="flex flex-wrap gap-2">
                {client.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

