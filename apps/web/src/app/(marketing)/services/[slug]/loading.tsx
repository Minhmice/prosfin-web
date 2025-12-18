import { ProsfinSectionWrapper } from "@/components/shared";

/**
 * Loading skeleton for service detail page
 */
export default function ServiceDetailLoading() {
  return (
    <>
      {/* Breadcrumb skeleton */}
      <ProsfinSectionWrapper padding="sm" background="default">
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          <span className="text-muted-foreground">/</span>
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          <span className="text-muted-foreground">/</span>
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
        </div>
      </ProsfinSectionWrapper>

      {/* Hero skeleton */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <div className="space-y-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
            <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
            <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-muted" />
          </div>

          {/* CTA buttons */}
          <div className="flex gap-4">
            <div className="h-10 w-32 animate-pulse rounded bg-muted" />
            <div className="h-10 w-28 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </ProsfinSectionWrapper>

      {/* Content sections skeleton */}
      <ProsfinSectionWrapper>
        <div className="space-y-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-8 w-1/3 animate-pulse rounded bg-muted" />
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}

