"use client";

import * as React from "react";
import {
  AdminSectionCard,
  Button,
  Input,
  Label,
  Textarea,
} from "@prosfin/ui";
import { Switch } from "@/components/shared/switch";
import { Copy, Check, Save, AlertCircle } from "lucide-react";
import {
  generateUTMLink,
  normalizeUTMValue,
  isValidUrl,
  generateShortLabel,
  type CreateCampaignInput,
} from "@/lib/data/campaigns";
import { showToast } from "@/lib/toast";
import type { ChannelPreset } from "@/types/admin";

interface UTMBuilderProps {
  onSave: (input: CreateCampaignInput) => Promise<void>;
}

const CHANNEL_PRESETS: { label: string; value: ChannelPreset; source: string; medium: string }[] = [
  { label: "Facebook", value: "facebook", source: "facebook", medium: "paid_social" },
  { label: "YouTube", value: "youtube", source: "youtube", medium: "video" },
  { label: "TikTok", value: "tiktok", source: "tiktok", medium: "paid_social" },
  { label: "LinkedIn", value: "linkedin", source: "linkedin", medium: "paid_social" },
  { label: "Email", value: "email", source: "newsletter", medium: "email" },
  { label: "Other", value: "other", source: "", medium: "" },
];

export function UTMBuilder({ onSave }: UTMBuilderProps) {
  const [formData, setFormData] = React.useState({
    name: "",
    destinationUrl: "https://prosfin.vn",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
    notes: "",
    tags: "",
  });
  const [channelPreset, setChannelPreset] = React.useState<ChannelPreset | null>(null);
  const [keepExistingParams, setKeepExistingParams] = React.useState(true);
  const [generatedUrl, setGeneratedUrl] = React.useState("");
  const [copied, setCopied] = React.useState<"url" | "short" | "utm" | null>(null);
  const [urlError, setUrlError] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);

  // Auto-generate URL when params change
  React.useEffect(() => {
    if (formData.destinationUrl && formData.utm_source && formData.utm_medium && formData.utm_campaign) {
      if (!isValidUrl(formData.destinationUrl)) {
        setUrlError("Invalid URL format");
        setGeneratedUrl("");
        return;
      }
      setUrlError("");
      const url = generateUTMLink({
        destinationUrl: formData.destinationUrl,
        utm_source: normalizeUTMValue(formData.utm_source),
        utm_medium: normalizeUTMValue(formData.utm_medium),
        utm_campaign: normalizeUTMValue(formData.utm_campaign),
        utm_content: formData.utm_content ? normalizeUTMValue(formData.utm_content) : undefined,
        utm_term: formData.utm_term ? normalizeUTMValue(formData.utm_term) : undefined,
        keepExistingParams,
      });
      setGeneratedUrl(url);
    } else {
      setGeneratedUrl("");
    }
  }, [formData, keepExistingParams]);

  const handlePreset = (preset: typeof CHANNEL_PRESETS[0]) => {
    setChannelPreset(preset.value);
    setFormData((prev) => ({
      ...prev,
      utm_source: preset.source,
      utm_medium: preset.medium,
    }));
  };

  const handleCopy = async (type: "url" | "short" | "utm") => {
    let text = "";
    if (type === "url") {
      text = generatedUrl;
    } else if (type === "short") {
      text = generateShortLabel({
        channelPreset: channelPreset || undefined,
        utm_campaign: normalizeUTMValue(formData.utm_campaign),
        destinationUrl: formData.destinationUrl,
      });
    } else {
      const url = new URL(generatedUrl);
      text = url.search.substring(1); // Remove leading "?"
    }
    await navigator.clipboard.writeText(text);
    setCopied(type);
    showToast.success(`Copied ${type === "url" ? "URL" : type === "short" ? "short label" : "UTM params"}`);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSave = async () => {
    if (!formData.name || !generatedUrl) {
      showToast.error("Please fill in required fields");
      return;
    }
    setIsSaving(true);
    try {
      await onSave({
        name: formData.name,
        destinationUrl: formData.destinationUrl,
        utm_source: normalizeUTMValue(formData.utm_source),
        utm_medium: normalizeUTMValue(formData.utm_medium),
        utm_campaign: normalizeUTMValue(formData.utm_campaign),
        utm_content: formData.utm_content ? normalizeUTMValue(formData.utm_content) : undefined,
        utm_term: formData.utm_term ? normalizeUTMValue(formData.utm_term) : undefined,
        channelPreset: channelPreset || undefined,
        notes: formData.notes || undefined,
        tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : undefined,
        keepExistingParams,
      });
      // Reset form
      setFormData({
        name: "", destinationUrl: "https://prosfin.vn", utm_source: "", utm_medium: "",
        utm_campaign: "", utm_content: "", utm_term: "", notes: "", tags: "",
      });
      setChannelPreset(null);
      setGeneratedUrl("");
    } finally {
      setIsSaving(false);
    }
  };

  const isValid = formData.name && formData.destinationUrl && formData.utm_source && 
                  formData.utm_medium && formData.utm_campaign && !urlError;

  return (
    <AdminSectionCard title="UTM Builder">
      <div className="space-y-6">
        {/* Section 1: Destination URL */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Destination URL</h4>
          <div>
            <Label htmlFor="destinationUrl">URL *</Label>
            <Input
              id="destinationUrl"
              value={formData.destinationUrl}
              onChange={(e) => setFormData((prev) => ({ ...prev, destinationUrl: e.target.value }))}
              placeholder="https://prosfin.vn/services"
              className={urlError ? "border-destructive" : ""}
            />
            {urlError && (
              <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                <AlertCircle className="size-3" /> {urlError}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={keepExistingParams} onCheckedChange={setKeepExistingParams} id="keepParams" />
            <Label htmlFor="keepParams" className="text-sm font-normal">Keep existing query params</Label>
          </div>
        </div>

        {/* Section 2: Channel Presets */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Channel Preset</h4>
          <div className="flex flex-wrap gap-2">
            {CHANNEL_PRESETS.map((preset) => (
              <Button
                key={preset.value}
                variant={channelPreset === preset.value ? "default" : "outline"}
                size="sm"
                onClick={() => handlePreset(preset)}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Section 3: Campaign Parameters */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Campaign Parameters</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="utm_source">UTM Source * <span className="text-muted-foreground text-xs">(referrer)</span></Label>
              <Input id="utm_source" value={formData.utm_source}
                onChange={(e) => setFormData((prev) => ({ ...prev, utm_source: e.target.value }))}
                placeholder="facebook, google, newsletter" />
            </div>
            <div>
              <Label htmlFor="utm_medium">UTM Medium * <span className="text-muted-foreground text-xs">(marketing medium)</span></Label>
              <Input id="utm_medium" value={formData.utm_medium}
                onChange={(e) => setFormData((prev) => ({ ...prev, utm_medium: e.target.value }))}
                placeholder="paid_social, email, cpc" />
            </div>
          </div>
          <div>
            <Label htmlFor="utm_campaign">UTM Campaign * <span className="text-muted-foreground text-xs">(campaign name)</span></Label>
            <Input id="utm_campaign" value={formData.utm_campaign}
              onChange={(e) => setFormData((prev) => ({ ...prev, utm_campaign: e.target.value }))}
              placeholder="prosfin_audit_2024w01" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="utm_content">UTM Content <span className="text-muted-foreground text-xs">(creative variant)</span></Label>
              <Input id="utm_content" value={formData.utm_content}
                onChange={(e) => setFormData((prev) => ({ ...prev, utm_content: e.target.value }))}
                placeholder="hookA_reel_v1" />
            </div>
            <div>
              <Label htmlFor="utm_term">UTM Term <span className="text-muted-foreground text-xs">(keyword)</span></Label>
              <Input id="utm_term" value={formData.utm_term}
                onChange={(e) => setFormData((prev) => ({ ...prev, utm_term: e.target.value }))}
                placeholder="finance_tips" />
            </div>
          </div>
        </div>

        {/* Section 4: Internal Label & Notes */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Internal Label & Notes</h4>
          <div>
            <Label htmlFor="name">Name * <span className="text-muted-foreground text-xs">(internal label)</span></Label>
            <Input id="name" value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="FB | Summer 2024 | Audit Service | W01" />
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Campaign notes..." rows={2} />
          </div>
          <div>
            <Label htmlFor="tags">Tags <span className="text-muted-foreground text-xs">(comma-separated)</span></Label>
            <Input id="tags" value={formData.tags}
              onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
              placeholder="summer, audit, facebook" />
          </div>
        </div>

        {/* Section 5: Output Preview */}
        {generatedUrl && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Generated URL</h4>
            <div className="rounded-md border bg-muted p-3">
              <p className="break-all text-sm font-mono">{generatedUrl}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => handleCopy("url")}>
                {copied === "url" ? <Check className="mr-2 size-4" /> : <Copy className="mr-2 size-4" />}
                Copy URL
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleCopy("short")}>
                {copied === "short" ? <Check className="mr-2 size-4" /> : <Copy className="mr-2 size-4" />}
                Copy Short Label
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleCopy("utm")}>
                {copied === "utm" ? <Check className="mr-2 size-4" /> : <Copy className="mr-2 size-4" />}
                Copy UTM Only
              </Button>
              <Button onClick={handleSave} disabled={!isValid || isSaving}>
                <Save className="mr-2 size-4" />
                {isSaving ? "Saving..." : "Save to History"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </AdminSectionCard>
  );
}

