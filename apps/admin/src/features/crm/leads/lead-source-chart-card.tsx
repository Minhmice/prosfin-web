/**
 * Lead Source Chart Card
 * Wrapper with title and range toggle
 */

"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeadSourceChart } from "./lead-source-chart"

export function LeadSourceChartCard() {
  const [range, setRange] = React.useState<"7d" | "30d">("7d")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Lead Sources</CardTitle>
            <CardDescription>Trend over the last {range === "7d" ? "7" : "30"} days</CardDescription>
          </div>
          <Tabs value={range} onValueChange={(value) => setRange(value as "7d" | "30d")}>
            <TabsList>
              <TabsTrigger value="7d">7D</TabsTrigger>
              <TabsTrigger value="30d">30D</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="min-h-[350px]">
        <LeadSourceChart range={range} />
      </CardContent>
    </Card>
  )
}

