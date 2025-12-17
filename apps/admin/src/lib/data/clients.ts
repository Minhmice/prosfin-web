import type { Client } from "@/types/admin";
import { mockClients } from "@/mocks/clients";

/**
 * Data adapter cho Clients
 */

let clientsData: Client[] = [...mockClients];

export async function listClients(): Promise<Client[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return [...clientsData];
}

export async function getClient(id: string): Promise<Client | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return clientsData.find((client) => client.id === id) || null;
}

export interface CreateClientInput {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  status?: Client["status"];
  linkedLeads?: string[];
  owner?: string;
}

export async function createClient(input: CreateClientInput): Promise<Client> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const newClient: Client = {
    id: `client-${Date.now()}`,
    companyName: input.companyName,
    contactName: input.contactName,
    email: input.email,
    phone: input.phone,
    status: input.status || "onboarding",
    linkedLeads: input.linkedLeads || [],
    owner: input.owner,
    timeline: [
      {
        id: `client-event-${Date.now()}`,
        type: "converted_to_client",
        title: "Client created from lead",
        timestamp: new Date().toISOString(),
        actor: "You",
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  clientsData.push(newClient);
  return newClient;
}

