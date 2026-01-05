/**
 * ExportMenu - Export options menu
 * 
 * Wrapper for DropdownMenu with export options.
 */

"use client";

import * as React from "react";
import { Download, FileText, Copy, Printer } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ExportMenuProps {
  onExportJSON?: () => void;
  onExportCSV?: () => void;
  onExportPDF?: () => void;
  onCopySummary?: () => void;
  onPrint?: () => void;
  trigger?: React.ReactNode;
}

/**
 * ExportMenu - Export options dropdown
 */
export function ExportMenu({
  onExportJSON,
  onExportCSV,
  onExportPDF,
  onCopySummary,
  onPrint,
  trigger,
}: ExportMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Xuất
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onCopySummary && (
          <DropdownMenuItem onClick={onCopySummary}>
            <Copy className="mr-2 h-4 w-4" />
            Sao chép tóm tắt
          </DropdownMenuItem>
        )}
        {onExportJSON && (
          <DropdownMenuItem onClick={onExportJSON}>
            <FileText className="mr-2 h-4 w-4" />
            Tải JSON
          </DropdownMenuItem>
        )}
        {onExportCSV && (
          <DropdownMenuItem onClick={onExportCSV}>
            <FileText className="mr-2 h-4 w-4" />
            Tải CSV
          </DropdownMenuItem>
        )}
        {onExportPDF && (
          <DropdownMenuItem onClick={onExportPDF}>
            <FileText className="mr-2 h-4 w-4" />
            Tải PDF
          </DropdownMenuItem>
        )}
        {onPrint && (
          <DropdownMenuItem onClick={onPrint}>
            <Printer className="mr-2 h-4 w-4" />
            In
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

