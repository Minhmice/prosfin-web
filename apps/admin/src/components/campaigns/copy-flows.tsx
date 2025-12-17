"use client";

import * as React from "react";
import { Button } from "@prosfin/ui";
import { Copy, Check, Link, Tag, Code } from "lucide-react";
import { extractUTMParams } from "@/lib/data/campaigns";
import { showToast } from "@/lib/toast";
import type { Campaign } from "@/types/admin";

interface CopyFlowsProps {
  campaign: Campaign;
  variant?: "buttons" | "icons";
  className?: string;
}

export function CopyFlows({ campaign, variant = "buttons", className }: CopyFlowsProps) {
  const [copied, setCopied] = React.useState<"url" | "short" | "utm" | null>(null);

  const handleCopy = async (type: "url" | "short" | "utm") => {
    let text = "";
    let label = "";
    
    if (type === "url") {
      text = campaign.generatedUrl;
      label = "URL";
    } else if (type === "short") {
      text = campaign.shortLabel || `[${campaign.channelPreset || "Other"}] ${campaign.utm_campaign}`;
      label = "Short label";
    } else {
      text = extractUTMParams(campaign.generatedUrl);
      label = "UTM params";
    }
    
    await navigator.clipboard.writeText(text);
    setCopied(type);
    showToast.success(`${label} copied`);
    setTimeout(() => setCopied(null), 2000);
  };

  if (variant === "icons") {
    return (
      <div className={`flex items-center gap-1 ${className || ""}`}>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={(e) => { e.stopPropagation(); handleCopy("url"); }}
          title="Copy URL"
        >
          {copied === "url" ? <Check className="size-3.5" /> : <Link className="size-3.5" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={(e) => { e.stopPropagation(); handleCopy("short"); }}
          title="Copy short label"
        >
          {copied === "short" ? <Check className="size-3.5" /> : <Tag className="size-3.5" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={(e) => { e.stopPropagation(); handleCopy("utm"); }}
          title="Copy UTM params"
        >
          {copied === "utm" ? <Check className="size-3.5" /> : <Code className="size-3.5" />}
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className || ""}`}>
      <Button variant="outline" size="sm" onClick={() => handleCopy("url")}>
        {copied === "url" ? <Check className="mr-2 size-4" /> : <Copy className="mr-2 size-4" />}
        Copy URL
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleCopy("short")}>
        {copied === "short" ? <Check className="mr-2 size-4" /> : <Tag className="mr-2 size-4" />}
        Copy Short Label
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleCopy("utm")}>
        {copied === "utm" ? <Check className="mr-2 size-4" /> : <Code className="mr-2 size-4" />}
        Copy UTM Only
      </Button>
    </div>
  );
}

