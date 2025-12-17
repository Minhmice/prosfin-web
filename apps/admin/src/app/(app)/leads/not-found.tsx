import Link from "next/link";
import { Button } from "@prosfin/ui";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Lead not found</h2>
        <p className="text-muted-foreground mt-2">
          The lead you're looking for doesn't exist or has been deleted.
        </p>
      </div>
      <Button asChild variant="outline">
        <Link href="/leads">
          <ArrowLeft className="mr-2 size-4" />
          Back to Leads
        </Link>
      </Button>
    </div>
  );
}

