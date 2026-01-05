/**
 * ServicesCompareTray - Sticky bottom-right tray
 * 
 * Shows selected services count and opens compare drawer.
 */

"use client";

import * as React from "react";
import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCompareAll } from "@/lib/services-explorer/compare-storage";
import { cn } from "@/lib/utils";

interface ServicesCompareTrayProps {
  onOpenCompare: () => void;
  className?: string;
}

/**
 * ServicesCompareTray - Compare tray component
 */
export function ServicesCompareTray({
  onOpenCompare,
  className,
}: ServicesCompareTrayProps) {
  const [compareCount, setCompareCount] = React.useState(0);

  React.useEffect(() => {
    const updateCount = () => {
      const compare = getCompareAll();
      setCompareCount(compare.length);
    };

    updateCount();
    // Update on storage change
    const interval = setInterval(updateCount, 500);
    return () => clearInterval(interval);
  }, []);

  if (compareCount === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 lg:bottom-8 lg:right-8",
        className
      )}
    >
      <Button
        onClick={onOpenCompare}
        size="lg"
        className="relative shadow-lg"
      >
        <Scale className="mr-2 h-5 w-5" />
        So sánh
        {compareCount > 0 && (
          <Badge
            variant="secondary"
            className="ml-2 h-5 min-w-5 rounded-full px-1.5 text-xs"
          >
            {compareCount}
          </Badge>
        )}
      </Button>
    </div>
  );
}

