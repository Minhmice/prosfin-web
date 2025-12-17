"use client";

import * as React from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import { getClient } from "@/lib/data/clients";
import { ClientDetailDrawer } from "@/components/clients/client-detail-drawer";

interface ClientDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ClientDetailPage({ params }: ClientDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [client, setClient] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getClient(id).then((data) => {
      setClient(data);
      setIsLoading(false);
      if (!data) {
        router.push("/clients");
      }
    });
  }, [id, router]);

  if (isLoading || !client) {
    return null;
  }

  return (
    <ClientDetailDrawer
      client={client}
      open={true}
      onOpenChange={() => router.push("/clients")}
    />
  );
}

