"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import type { ModuleConfig, ModuleDetailBlock } from "@/content/services/types";

interface ModuleDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  module?: ModuleConfig;
  onOpenCta?: (payload?: Record<string, unknown>) => void;
}

export function ModuleDetailDialog({ open, onOpenChange, module, onOpenCta }: ModuleDetailDialogProps) {
  if (!module) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Badge variant="outline">{module.tag}</Badge>
            {module.name}
          </DialogTitle>
          <DialogDescription>{module.promise}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 text-sm">
          <SectionBlock title="Outcomes" items={module.outcomes} />
          <Separator />
          <SectionBlock title="Deliverables" items={module.deliverables} />
          <Separator />
          <SectionBlock title="Client inputs" items={module.clientInputs} />
          {module.dependencies && module.dependencies.length > 0 && (
            <>
              <Separator />
              <SectionBlock title="Dependencies" items={module.dependencies} />
            </>
          )}
          {module.detailBlocks && module.detailBlocks.length > 0 && (
            <>
              <Separator />
              <DetailBlocksBlock title="Notes" blocks={module.detailBlocks} />
            </>
          )}
          {module.pitfalls && module.pitfalls.length > 0 && (
            <>
              <Separator />
              <SectionBlock title="Pitfalls" items={module.pitfalls} />
            </>
          )}
        </div>
        {onOpenCta && (
          <div className="mt-4 flex justify-end">
            <Button
              onClick={() => {
                onOpenCta({
                  sourceDetail: `module_dialog:${module.id}`,
                  moduleId: module.id,
                });
                onOpenChange(false);
              }}
            >
              Đặt lịch khảo sát về module này
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function SectionBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold">{title}</p>
      <ul className="space-y-1 text-muted-foreground">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

function DetailBlocksBlock({ title, blocks }: { title: string; blocks: string[] | ModuleDetailBlock[] }) {
  // Handle string[] case
  if (blocks.length > 0 && typeof blocks[0] === "string") {
    return <SectionBlock title={title} items={blocks as string[]} />;
  }

  // Handle ModuleDetailBlock[] case
  return (
    <div>
      <p className="mb-2 text-sm font-semibold">{title}</p>
      <div className="space-y-3">
        {(blocks as ModuleDetailBlock[]).map((block, idx) => {
          if (block.type === "bullets") {
            return (
              <div key={idx}>
                <p className="mb-1 text-sm font-medium">{block.title}</p>
                <ul className="space-y-1 text-muted-foreground">
                  {block.items.map((item, itemIdx) => (
                    <li key={itemIdx}>• {item}</li>
                  ))}
                </ul>
              </div>
            );
          }
          if (block.type === "callout") {
            return (
              <div key={idx} className="rounded-md border bg-muted p-3">
                <p className="mb-1 text-sm font-medium">{block.title}</p>
                <p className="text-sm text-muted-foreground">{block.body}</p>
              </div>
            );
          }
          if (block.type === "preview") {
            return (
              <div key={idx}>
                <p className="mb-1 text-sm font-medium">{block.title}</p>
                <div className="rounded-md border bg-muted p-3">
                  {block.placeholders.map((placeholder, placeholderIdx) => (
                    <div key={placeholderIdx} className="mb-1 text-sm text-muted-foreground">
                      {placeholder}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

