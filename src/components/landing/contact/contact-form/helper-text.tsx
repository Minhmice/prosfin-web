"use client";

import * as React from "react";
import { Text } from "@/components/shared";

export function HelperText({ children }: { children: React.ReactNode }) {
  return (
    <Text as="p" variant="muted" className="text-xs">
      {children}
    </Text>
  );
}


