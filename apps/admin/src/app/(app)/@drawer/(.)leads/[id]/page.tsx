"use client";

import * as React from "react";
import { use } from "react";
import { getLead } from "@/lib/data/leads";
import { LeadDetailDrawer } from "@/components/leads/lead-detail-drawer";
import { useRouter } from "next/navigation";

interface LeadDetailDrawerPageProps {
  params: Promise<{ id: string }>;
}

export default function LeadDetailDrawerPage({ params }: LeadDetailDrawerPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [lead, setLead] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getLead(id).then((data) => {
      setLead(data);
      setIsLoading(false);
      if (!data) {
        router.push("/leads");
      }
    });
  }, [id, router]);

  if (isLoading || !lead) {
    return null;
  }

  return <LeadDetailDrawer lead={lead} open={true} onOpenChange={() => router.push("/leads")} />;
}

