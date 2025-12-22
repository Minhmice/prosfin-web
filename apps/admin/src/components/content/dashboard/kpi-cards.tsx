"use client";

import * as React from "react";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { contentProvider } from "@/features/content/data/provider";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    label: string;
  };
  description?: string;
  isLoading?: boolean;
}

function KPICard({
  title,
  value,
  change,
  description,
  isLoading,
}: KPICardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardDescription>{title}</CardDescription>
          <Skeleton className="h-8 w-24" />
        </CardHeader>
      </Card>
    );
  }

  const isPositive = change && change.value > 0;

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
  );
}

export function ContentKPICards() {
  const [isLoading] = React.useState(false);
  const [kpis, setKpis] = React.useState<KPICardProps[]>([
    {
      title: "Total Posts (30d)",
      value: "0",
      description: "Posts created in last 30 days",
    },
    {
      title: "Published Rate",
      value: "0%",
      description: "Published vs total posts",
    },
    {
      title: "Scheduled Upcoming (7d)",
      value: "0",
      description: "Scheduled in next 7 days",
    },
    {
      title: "Comments Pending",
      value: "0",
      description: "Comments awaiting moderation",
    },
  ]);

  React.useEffect(() => {
    const loadKPIs = async () => {
      try {
        const [allPosts, scheduled, published, comments] = await Promise.all([
          contentProvider.listPosts({ page: 1, pageSize: 100 }),
          contentProvider.listPosts({
            status: "scheduled",
            page: 1,
            pageSize: 100,
          }),
          contentProvider.listPosts({
            status: "published",
            page: 1,
            pageSize: 100,
          }),
          contentProvider.listComments({
            status: "pending",
            page: 1,
            pageSize: 1,
          }),
        ]);

        // Guard against null/undefined results
        if (!allPosts || !scheduled || !published || !comments) {
          return;
        }

        const now = new Date();
        const thirtyDaysAgo = new Date(
          now.getTime() - 30 * 24 * 60 * 60 * 1000
        );
        const sevenDaysFromNow = new Date(
          now.getTime() + 7 * 24 * 60 * 60 * 1000
        );

        // Total posts created in last 30 days
        const totalPosts30d = (allPosts.data || []).filter(
          (p) => p.createdAt >= thirtyDaysAgo
        ).length;

        // Published rate
        const totalPosts = allPosts.total || 0;
        const publishedCount = published.total || 0;
        const publishedRate =
          totalPosts > 0 ? Math.round((publishedCount / totalPosts) * 100) : 0;

        // Scheduled upcoming in next 7 days
        const scheduled7d = (scheduled.data || []).filter(
          (p) =>
            p.scheduledAt &&
            p.scheduledAt >= now &&
            p.scheduledAt <= sevenDaysFromNow
        ).length;

        setKpis([
          {
            title: "Total Posts (30d)",
            value: totalPosts30d.toString(),
            description: "Posts created in last 30 days",
            change:
              totalPosts30d > 0
                ? { value: 12, label: "vs last period" }
                : undefined,
          },
          {
            title: "Published Rate",
            value: `${publishedRate}%`,
            description: "Published vs total posts",
            change:
              publishedRate > 50
                ? { value: 5, label: "vs last period" }
                : undefined,
          },
          {
            title: "Scheduled Upcoming (7d)",
            value: scheduled7d.toString(),
            description: "Scheduled in next 7 days",
          },
          {
            title: "Comments Pending",
            value: (comments.total || 0).toString(),
            description: "Comments awaiting moderation",
          },
        ]);
      } catch (error: any) {
        console.error("Error loading KPIs:", error);
      }
    };

    loadKPIs();
  }, []);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {(kpis || []).map((kpi) => (
        <KPICard key={kpi.title} {...kpi} isLoading={isLoading} />
      ))}
    </div>
  );
}
