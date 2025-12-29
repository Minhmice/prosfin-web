"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { IconInfoCircle } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"

export function ModerationBestPractices() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Moderation Best Practices</CardTitle>
        <CardDescription>Guidelines for effective comment moderation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <IconInfoCircle className="size-4" />
          <AlertDescription>
            <div className="space-y-2">
              <div>
                <div className="font-medium mb-1">Status Workflow</div>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline">Pending</Badge>
                  <span>→</span>
                  <Badge variant="default">Approved</Badge>
                  <span>or</span>
                  <Badge variant="secondary">Hidden</Badge>
                  <span>or</span>
                  <Badge variant="destructive">Spam</Badge>
                </div>
              </div>
              <div>
                <div className="font-medium mb-1">Quick Actions</div>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Approve positive and constructive comments</li>
                  <li>Hide comments that are off-topic or inappropriate</li>
                  <li>Mark obvious spam for automated filtering</li>
                  <li>Reply to questions and concerns promptly</li>
                </ul>
              </div>
              <div>
                <div className="font-medium mb-1">Escalation</div>
                <p className="text-sm">
                  For sensitive issues, assign to a team member for review before
                  responding.
                </p>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
