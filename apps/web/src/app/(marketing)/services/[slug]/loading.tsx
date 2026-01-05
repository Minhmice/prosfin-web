/**
 * Service Detail Loading Boundary
 * 
 * Skeleton UI for service detail page.
 */

export default function ServiceDetailLoading() {
  return (
    <div className="space-y-12">
      {/* Hero skeleton */}
      <div className="space-y-4">
        <div className="h-12 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
        <div className="h-64 w-full animate-pulse rounded-lg bg-muted" />
      </div>

      {/* Sections skeleton */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <div className="h-8 w-1/3 animate-pulse rounded bg-muted" />
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
