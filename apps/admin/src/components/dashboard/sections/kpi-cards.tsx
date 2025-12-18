"use client"

import * as React from "react"
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface KPICardProps {
  title: string
  value: string | number
  change?: {
    value: number
    label: string
  }
  description?: string
  isLoading?: boolean
}

function KPICard({ title, value, change, description, isLoading }: KPICardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardDescription>{title}</CardDescription>
          <Skeleton className="h-8 w-24" />
        </CardHeader>
      </Card>
    )
  }

  const isPositive = change && change.value > 0

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
        {change && (
          <CardAction>
            <Badge variant="outline">
              {isPositive ? (
                <IconTrendingUp className="size-3" />
              ) : (
                <IconTrendingDown className="size-3" />
              )}
              {isPositive ? "+" : ""}
              {change.value}%
            </Badge>
          </CardAction>
        )}
      </CardHeader>
      {description && (
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">{description}</div>
        </CardFooter>
      )}
    </Card>
  )
}

export function KPICards() {
  // Mock data - will be replaced with real data in Phase 3
  const [isLoading] = React.useState(false)

  const kpis = [
    {
      title: "New Leads (7d)",
      value: "24",
      change: { value: 12.5, label: "vs last week" },
      description: "New leads in the last 7 days",
    },
    {
      title: "Active Clients",
      value: "156",
      change: { value: 8.2, label: "vs last month" },
      description: "Currently active clients",
    },
    {
      title: "Draft Posts",
      value: "12",
      change: { value: -5.0, label: "vs last week" },
      description: "Posts in draft status",
    },
    {
      title: "Scheduled Posts",
      value: "8",
      change: { value: 25.0, label: "vs last week" },
      description: "Posts scheduled for publication",
    },
  ]

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {kpis.map((kpi) => (
        <KPICard key={kpi.title} {...kpi} isLoading={isLoading} />
      ))}
    </div>
  )
}
