import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-6">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-3 w-full" />
          </div>
        ))}
      </div>
      <div className="px-4 lg:px-6">
        <div className="rounded-lg border p-6">
          <Skeleton className="h-6 w-48 mb-4" />
          <Skeleton className="h-[250px] w-full" />
        </div>
      </div>
    </div>
  )
}
