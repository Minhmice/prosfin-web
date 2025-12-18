import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Activity {
  id: string
  type: "lead" | "client" | "content"
  message: string
  timestamp: Date
}

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "lead",
    message: "New lead from website: John Doe",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    type: "client",
    message: "Client ABC Corp updated status",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "3",
    type: "content",
    message: "Post 'Getting Started' published",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates and changes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{activity.message}</p>
                <p className="text-xs text-muted-foreground">
                  {activity.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
