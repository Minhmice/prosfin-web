"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function ToolsDrawer() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          Tools drawer
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[360px]">
        <SheetHeader>
          <SheetTitle>Tools</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4 text-sm text-muted-foreground">
          <div>
            <p className="font-semibold text-foreground">Ledger Health Scan (full)</p>
            <p className="text-muted-foreground">Phiên bản dài, sẽ gắn sau.</p>
          </div>
          <Separator />
          <div>
            <p className="font-semibold text-foreground">Checklist dữ liệu</p>
            <p className="text-muted-foreground">Download sẽ được thêm sau.</p>
          </div>
          <Separator />
          <div>
            <p className="font-semibold text-foreground">Reporting pack sample</p>
            <p className="text-muted-foreground">Placeholder preview.</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

