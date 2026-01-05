/**
 * ServicesCompareDrawer - Compare drawer with table
 * 
 * Side sheet with compare table and share link functionality.
 */

"use client";

import * as React from "react";
import { Copy, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppDrawer } from "@/components/shared/drawers/app-drawer";
import { ProsfinPrimaryButton } from "@/components/shared/button/primary-button";
import type { Service } from "@/types/content";
import {
  getCompareAll,
  removeFromCompare,
} from "@/lib/services-explorer/compare-storage";
import { normalizeCompareData } from "@/lib/services-explorer/compare";
import { buildExplorerParams } from "@/lib/services-explorer/params";
import { getAllServices } from "@/lib/content/services";
import { trackEvent } from "@/lib/analytics";
import { useProsfinToast } from "@/components/shared/toast/use-prosfin-toast";

interface ServicesCompareDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * ServicesCompareDrawer - Compare drawer component
 */
export function ServicesCompareDrawer({
  open,
  onOpenChange,
}: ServicesCompareDrawerProps) {
  const [services, setServices] = React.useState<Service[]>([]);
  const [copied, setCopied] = React.useState(false);
  const toast = useProsfinToast();

  React.useEffect(() => {
    if (open) {
      trackEvent("compare_opened", {});
      const compareSlugs = getCompareAll();
      const allServices = getAllServices();
      const compareServices = allServices.filter((s) =>
        compareSlugs.includes(s.slug)
      );
      setServices(compareServices);
    }
  }, [open]);

  const handleRemove = (slug: string) => {
    removeFromCompare(slug);
    const updated = services.filter((s) => s.slug !== slug);
    setServices(updated);
  };

  const handleShare = () => {
    const compareSlugs = getCompareAll();
    const params = buildExplorerParams({ compare: compareSlugs });
    const url = `${window.location.origin}/services?${params.toString()}`;

    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      toast.success("Đã sao chép link so sánh!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const compareRows = normalizeCompareData(services);

  if (services.length === 0) {
    return null;
  }

  return (
    <AppDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="So sánh dịch vụ"
      side="right"
      size="xl"
    >
      <div className="space-y-4">
        {/* Share button */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="gap-2"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Đã sao chép
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Sao chép link
              </>
            )}
          </Button>
        </div>

        {/* Compare table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left text-sm font-semibold">Tiêu chí</th>
                {services.map((service) => (
                  <th
                    key={service.slug}
                    className="relative p-2 text-left text-sm font-semibold"
                  >
                    <div className="pr-6">{service.title}</div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-1/2 h-6 w-6 -translate-y-1/2"
                      onClick={() => handleRemove(service.slug)}
                      aria-label="Xóa khỏi so sánh"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row) => (
                <tr key={row.field} className="border-b">
                  <td className="p-2 text-sm font-medium">{row.label}</td>
                  {row.values.map((value, index) => (
                    <td key={index} className="p-2 text-sm text-muted-foreground">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTAs */}
        <div className="grid gap-2 sm:grid-cols-2">
          {services.map((service) => (
            <ProsfinPrimaryButton
              key={service.slug}
              href={`/services/${service.slug}`}
              className="w-full"
            >
              Xem chi tiết {service.title}
            </ProsfinPrimaryButton>
          ))}
        </div>
      </div>
    </AppDrawer>
  );
}

