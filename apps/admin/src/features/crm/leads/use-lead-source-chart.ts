/**
 * Lead Source Chart Hook
 * Fetch and format chart data
 */

import * as React from "react"
import { crmProvider } from "../data/provider"
import type { LeadSourceSeries } from "../types"

export function useLeadSourceChart(range: "7d" | "30d") {
  const [data, setData] = React.useState<LeadSourceSeries | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    let cancelled = false

    async function fetchData() {
      setIsLoading(true)
      setError(null)
      try {
        const result = await crmProvider.getLeadSourceSeries({ range })
        if (!cancelled) {
          setData(result)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error("Failed to fetch chart data"))
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      cancelled = true
    }
  }, [range])

  return { data, isLoading, error }
}

