"use client"

import * as React from "react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { contentProvider } from "@/features/content/data/provider"
import { mockPosts, mockSchedules } from "@/data/content-mock"

const performanceConfig = {
  facebook: {
    label: "Facebook",
    color: "hsl(var(--chart-1))",
  },
  tiktok: {
    label: "TikTok",
    color: "hsl(var(--chart-2))",
  },
  linkedin: {
    label: "LinkedIn",
    color: "hsl(var(--chart-3))",
  },
  twitter: {
    label: "Twitter",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

const postsConfig = {
  posts: {
    label: "Posts",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function ChartsSection() {
  const [performanceData, setPerformanceData] = React.useState<Array<{
    channel: string
    facebook: number
    tiktok: number
    linkedin: number
    twitter: number
  }>>([])
  const [postsData, setPostsData] = React.useState<Array<{
    date: string
    posts: number
  }>>([])

  React.useEffect(() => {
    const loadChartData = () => {
      // Performance by channel - aggregate posts by channel
      const channelCounts: Record<string, number> = {
        facebook: 0,
        tiktok: 0,
        linkedin: 0,
        twitter: 0,
      }

      mockPosts.forEach((post) => {
        post.channels.forEach((channel) => {
          if (channel in channelCounts) {
            channelCounts[channel as keyof typeof channelCounts]++
          }
        })
      })

      setPerformanceData([
        {
          channel: "Performance",
          facebook: channelCounts.facebook,
          tiktok: channelCounts.tiktok,
          linkedin: channelCounts.linkedin,
          twitter: channelCounts.twitter,
        },
      ])

      // Posts over time - last 30 days
      const now = new Date()
      const days = Array.from({ length: 30 }, (_, i) => {
        const date = new Date(now)
        date.setDate(date.getDate() - (29 - i))
        return date
      })

      const postsByDate = days.map((date) => {
        const count = mockPosts.filter((post) => {
          const postDate = post.createdAt
          return (
            postDate.getDate() === date.getDate() &&
            postDate.getMonth() === date.getMonth() &&
            postDate.getFullYear() === date.getFullYear()
          )
        }).length

        return {
          date: date.toISOString().split("T")[0],
          posts: count,
        }
      })

      setPostsData(postsByDate)
    }

    loadChartData()
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Performance by Channel</CardTitle>
          <CardDescription>Posts distribution across channels</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={performanceConfig} className="h-[250px]">
            <BarChart data={performanceData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="channel" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="facebook" fill="var(--color-facebook)" />
              <Bar dataKey="tiktok" fill="var(--color-tiktok)" />
              <Bar dataKey="linkedin" fill="var(--color-linkedin)" />
              <Bar dataKey="twitter" fill="var(--color-twitter)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Posts Over Time</CardTitle>
          <CardDescription>Posts created in last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={postsConfig} className="h-[250px]">
            <AreaChart data={postsData}>
              <defs>
                <linearGradient id="fillPosts" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-posts)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-posts)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }}
                  />
                }
              />
              <Area
                dataKey="posts"
                type="natural"
                fill="url(#fillPosts)"
                stroke="var(--color-posts)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

