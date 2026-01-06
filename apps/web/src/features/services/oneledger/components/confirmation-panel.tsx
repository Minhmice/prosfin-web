/**
 * Confirmation Panel
 * 
 * Next steps panel shown after successful lead submission.
 * Includes download scope, checklist, and calendar link.
 */

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Calendar, CheckSquare } from "lucide-react";

interface ConfirmationPanelProps {
  leadId?: string;
}

export function ConfirmationPanel({ leadId }: ConfirmationPanelProps) {
  const handleDownloadScope = () => {
    // TODO: Implement PDF download
    // For now, placeholder
    window.open("/api/oneledger/scope-pdf", "_blank");
  };

  const handleDownloadChecklist = () => {
    // TODO: Implement checklist download
    window.open("/api/oneledger/data-checklist", "_blank");
  };

  const handleBookCalendar = () => {
    // TODO: Implement calendar booking
    // For now, open email or calendar link
    window.open("mailto:contact@prosfin.vn?subject=Đặt lịch khảo sát OneLedger", "_blank");
  };

  return (
    <Card className="border-primary/30 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Bước tiếp theo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-lg border p-3">
            <Download className="h-5 w-5 text-primary mt-0.5" />
            <div className="flex-1 space-y-1">
              <h3 className="font-semibold text-sm">Scope & Acceptance Gates</h3>
              <p className="text-xs text-muted-foreground">
                Tải về phạm vi dự án và các gate nghiệm thu để tham khảo trước cuộc gọi.
              </p>
              <Button size="sm" variant="outline" onClick={handleDownloadScope} className="mt-2">
                Tải PDF
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border p-3">
            <CheckSquare className="h-5 w-5 text-primary mt-0.5" />
            <div className="flex-1 space-y-1">
              <h3 className="font-semibold text-sm">Data Request Checklist</h3>
              <p className="text-xs text-muted-foreground">
                Danh sách dữ liệu cần chuẩn bị cho cuộc khảo sát.
              </p>
              <Button size="sm" variant="outline" onClick={handleDownloadChecklist} className="mt-2">
                Tải checklist
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border p-3">
            <Calendar className="h-5 w-5 text-primary mt-0.5" />
            <div className="flex-1 space-y-1">
              <h3 className="font-semibold text-sm">Đặt lịch khảo sát</h3>
              <p className="text-xs text-muted-foreground">
                Chọn thời gian phù hợp cho cuộc gọi đánh giá (30 phút).
              </p>
              <Button size="sm" variant="outline" onClick={handleBookCalendar} className="mt-2">
                Mở lịch
              </Button>
            </div>
          </div>
        </div>

        {leadId && (
          <div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground">
            <p>Mã tham chiếu: <span className="font-mono">{leadId}</span></p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

