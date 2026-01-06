"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProsfinToast } from "@/components/shared/toast/toast-provider";
import type { ServicePageConfig } from "@/content/services/types";

interface DeliverablesTabsProps {
  config: ServicePageConfig;
}

export function DeliverablesTabs({ config }: DeliverablesTabsProps) {
  const tabs = config.deliverablesTabs;
  const toast = useProsfinToast();

  const handleCopy = async (items: string[] | Array<{ label: string; note?: string }>) => {
    if (typeof navigator === "undefined") return;
    const text = items.map((item) => (typeof item === "string" ? item : item.label)).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      toast.toast({
        description: "Đã sao chép danh sách deliverables vào clipboard",
        variant: "success",
      });
    } catch (error) {
      toast.toast({
        description: "Không thể sao chép. Vui lòng thử lại.",
        variant: "error",
      });
    }
  };

  if (!tabs.length) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Deliverables vault</p>
          <h2 className="text-2xl font-semibold">Artifacts theo tab</h2>
        </div>
      </div>
      <Tabs defaultValue={tabs[0].id} className="w-full">
        <TabsList className="flex flex-wrap">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="space-y-3 rounded-lg border p-4">
            <ul className="space-y-1 text-sm text-muted-foreground">
              {tab.items.map((item, idx) => {
                const key = typeof item === "string" ? item : item.label;
                const label = typeof item === "string" ? item : item.label;
                const note = typeof item === "string" ? undefined : item.note;
                return (
                  <li key={key || idx}>
                    • {label}
                    {note && <span className="ml-2 text-xs text-muted-foreground">({note})</span>}
                  </li>
                );
              })}
            </ul>
            {tab.whoUsesIt && tab.whoUsesIt.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-semibold">Ai sử dụng:</p>
                <div className="flex flex-wrap gap-2">
                  {tab.whoUsesIt.map((persona) => (
                    <Badge key={persona} variant="secondary">
                      {persona === "owner" && "Chủ DN"}
                      {persona === "cfo" && "CFO"}
                      {persona === "chief-accountant" && "Kế toán trưởng"}
                      {persona === "finance-team" && "Đội tài chính"}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {tab.decisionsEnabled && tab.decisionsEnabled.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-semibold">Quyết định được hỗ trợ:</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {tab.decisionsEnabled.map((decision, idx) => (
                    <li key={idx}>• {decision}</li>
                  ))}
                </ul>
              </div>
            )}
            <Button size="sm" variant="secondary" onClick={() => handleCopy(tab.items)}>
              Copy deliverables list
            </Button>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

