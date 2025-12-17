import type { Client } from "@/types/admin";

export const mockClients: Client[] = [
  {
    id: "client-1",
    companyName: "Công ty ABC",
    contactName: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    status: "active",
    owner: "You",
    linkedLeads: ["lead-1"],
    timeline: [
      {
        id: "client-event-1",
        type: "converted_to_client",
        title: "Client created from lead",
        timestamp: "2024-01-11T10:00:00Z",
        actor: "You",
      },
    ],
    createdAt: "2024-01-11T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "client-2",
    companyName: "Studio XYZ",
    contactName: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0912345678",
    status: "active",
    owner: "Admin",
    linkedLeads: ["lead-2"],
    timeline: [
      {
        id: "client-event-2",
        type: "converted_to_client",
        title: "Client created from lead",
        timestamp: "2024-01-10T09:00:00Z",
        actor: "Admin",
      },
    ],
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-01-14T15:00:00Z",
  },
  {
    id: "client-3",
    companyName: "Công ty E",
    contactName: "Hoàng Văn E",
    email: "hoangvane@example.com",
    phone: "0945678901",
    status: "onboarding",
    owner: "You",
    linkedLeads: ["lead-5"],
    timeline: [
      {
        id: "client-event-3",
        type: "converted_to_client",
        title: "Client created from lead",
        timestamp: "2024-01-11T10:00:00Z",
        actor: "You",
      },
    ],
    createdAt: "2024-01-11T10:00:00Z",
    updatedAt: "2024-01-11T10:00:00Z",
  },
];

