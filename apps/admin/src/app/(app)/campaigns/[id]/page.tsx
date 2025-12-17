"use client";

import * as React from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import { AdminPageShell } from "@prosfin/ui";
import { getCampaign } from "@/lib/data/campaigns";
import { CampaignDetailView } from "@/components/campaigns/campaign-detail-view";
import type { Campaign } from "@/types/admin";

interface CampaignDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function CampaignDetailPage({ params }: CampaignDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [campaign, setCampaign] = React.useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getCampaign(id).then((data) => {
      setCampaign(data);
      setIsLoading(false);
      if (!data) {
        router.push("/campaigns");
      }
    });
  }, [id, router]);

  if (isLoading) {
    return (
      <AdminPageShell title="Loading..." description="">
        <div className="h-96 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading campaign...</div>
        </div>
      </AdminPageShell>
    );
  }

  if (!campaign) {
    return null;
  }

  return (
    <AdminPageShell
      title="Campaign Details"
      description={`Viewing ${campaign.name}`}
    >
      <CampaignDetailView
        campaign={campaign}
        onCampaignUpdated={(updated) => setCampaign(updated)}
      />
    </AdminPageShell>
  );
}

