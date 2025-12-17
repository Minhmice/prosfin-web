"use client";

import * as React from "react";
import { format } from "date-fns";
import {
  AdminPageShell,
  AdminSectionCard,
  Button,
  Input,
  Label,
  Badge,
} from "@prosfin/ui";
import { AppDataTable } from "@/components/admin/data-table/app-data-table";
import { Copy, Check } from "lucide-react";
import { listCampaigns, createCampaign, generateUTMLink } from "@/lib/data/campaigns";
import type { Campaign } from "@/types/admin";
import type { DataTableColumn } from "@/components/admin/data-table/types";

const statusColors: Record<Campaign["status"], string> = {
  draft: "bg-gray-100 text-gray-800",
  active: "bg-green-100 text-green-800",
  paused: "bg-yellow-100 text-yellow-800",
  completed: "bg-blue-100 text-blue-800",
};

const presets = [
  { label: "Facebook", source: "facebook", medium: "social" },
  { label: "YouTube", source: "youtube", medium: "social" },
  { label: "TikTok", source: "tiktok", medium: "social" },
  { label: "LinkedIn", source: "linkedin", medium: "social" },
  { label: "Email", source: "email", medium: "email" },
];

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [generatedUrl, setGeneratedUrl] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: "",
    baseUrl: "https://prosfin.vn",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
  });

  React.useEffect(() => {
    listCampaigns().then((data) => {
      setCampaigns(data);
      setIsLoading(false);
    });
  }, []);

  const handlePreset = (preset: typeof presets[0]) => {
    setFormData((prev) => ({
      ...prev,
      utm_source: preset.source,
      utm_medium: preset.medium,
    }));
  };

  const handleGenerate = () => {
    if (!formData.baseUrl || !formData.utm_source || !formData.utm_medium || !formData.utm_campaign) {
      return;
    }
    const url = generateUTMLink({
      baseUrl: formData.baseUrl,
      utm_source: formData.utm_source,
      utm_medium: formData.utm_medium,
      utm_campaign: formData.utm_campaign,
      utm_content: formData.utm_content || undefined,
      utm_term: formData.utm_term || undefined,
    });
    setGeneratedUrl(url);
  };

  const handleCopy = async () => {
    if (generatedUrl) {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = async () => {
    if (!formData.name || !generatedUrl) return;
    const newCampaign = await createCampaign({
      name: formData.name,
      baseUrl: formData.baseUrl,
      utm_source: formData.utm_source,
      utm_medium: formData.utm_medium,
      utm_campaign: formData.utm_campaign,
      utm_content: formData.utm_content || undefined,
      utm_term: formData.utm_term || undefined,
      status: "draft",
    });
    setCampaigns((prev) => [...prev, newCampaign]);
    setFormData({
      name: "",
      baseUrl: "https://prosfin.vn",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
    });
    setGeneratedUrl("");
  };

  const columns: DataTableColumn<Campaign>[] = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      enableSorting: true,
    },
    {
      id: "generatedUrl",
      header: "URL",
      accessorKey: "generatedUrl",
      cell: ({ row }) => (
        <a
          href={row.original.generatedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline text-sm"
        >
          {row.original.generatedUrl}
        </a>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <Badge className={statusColors[row.original.status]}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "createdAt",
      header: "Created",
      accessorKey: "createdAt",
      cell: ({ row }) =>
        format(new Date(row.original.createdAt), "MMM dd, yyyy"),
    },
  ];

  return (
    <AdminPageShell
      title="Campaigns"
      description="Manage your marketing campaigns"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <AdminSectionCard title="UTM Builder">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Summer 2024 Campaign"
              />
            </div>
            <div>
              <Label htmlFor="baseUrl">Base URL</Label>
              <Input
                id="baseUrl"
                value={formData.baseUrl}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, baseUrl: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Presets</Label>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <Button
                    key={preset.label}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreset(preset)}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="utm_source">UTM Source *</Label>
                <Input
                  id="utm_source"
                  value={formData.utm_source}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      utm_source: e.target.value,
                    }))
                  }
                  placeholder="google"
                />
              </div>
              <div>
                <Label htmlFor="utm_medium">UTM Medium *</Label>
                <Input
                  id="utm_medium"
                  value={formData.utm_medium}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      utm_medium: e.target.value,
                    }))
                  }
                  placeholder="cpc"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="utm_campaign">UTM Campaign *</Label>
              <Input
                id="utm_campaign"
                value={formData.utm_campaign}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    utm_campaign: e.target.value,
                  }))
                }
                placeholder="summer-2024"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="utm_content">UTM Content</Label>
                <Input
                  id="utm_content"
                  value={formData.utm_content}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      utm_content: e.target.value,
                    }))
                  }
                  placeholder="ad-1"
                />
              </div>
              <div>
                <Label htmlFor="utm_term">UTM Term</Label>
                <Input
                  id="utm_term"
                  value={formData.utm_term}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      utm_term: e.target.value,
                    }))
                  }
                  placeholder="keyword"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleGenerate}>Generate Link</Button>
              {generatedUrl && (
                <>
                  <Button variant="outline" onClick={handleCopy}>
                    {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  </Button>
                  <Button onClick={handleSave}>Save Campaign</Button>
                </>
              )}
            </div>
            {generatedUrl && (
              <div className="rounded-md border bg-muted p-3">
                <p className="text-muted-foreground text-xs">Generated URL:</p>
                <p className="break-all text-sm">{generatedUrl}</p>
              </div>
            )}
          </div>
        </AdminSectionCard>
        <AdminSectionCard title="Campaign History">
          <AppDataTable
            columns={columns}
            data={campaigns}
            isLoading={isLoading}
            searchPlaceholder="Search campaigns..."
            emptyMessage="No campaigns found"
          />
        </AdminSectionCard>
      </div>
    </AdminPageShell>
  );
}
