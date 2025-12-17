import { getClient } from "@/lib/data/clients";
import { ClientDetailDrawer } from "@/components/clients/client-detail-drawer";
import { notFound } from "next/navigation";

interface InterceptedClientDetailPageProps {
  params: { id: string };
}

export default async function InterceptedClientDetailPage({ params }: InterceptedClientDetailPageProps) {
  const { id } = params;
  const client = await getClient(id);

  if (!client) {
    notFound();
  }

  return <ClientDetailDrawer client={client} open={true} onOpenChange={() => {}} />;
}

