import { getClient } from "@/lib/data/clients";
import { ClientDetailDrawer } from "@/components/clients/client-detail-drawer";
import { notFound } from "next/navigation";

export default async function ClientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const client = await getClient(params.id);

  if (!client) {
    notFound();
  }

  return <ClientDetailDrawer client={client} open={true} onOpenChange={() => {}} />;
}

