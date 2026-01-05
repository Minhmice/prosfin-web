import { ProsfinSectionWrapper } from "@/components/shared";
import { Skeleton } from "@/components/ui/skeleton";

export default function ToolDetailLoading() {
  return (
    <>
      {/* Hero Skeleton */}
      <ProsfinSectionWrapper background="muted" padding="lg">
        <div className="container mx-auto max-w-6xl space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-full" />
        </div>
      </ProsfinSectionWrapper>

      {/* Main Content Skeleton */}
      <ProsfinSectionWrapper>
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Input Panel Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            {/* Results Panel Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </ProsfinSectionWrapper>
    </>
  );
}

