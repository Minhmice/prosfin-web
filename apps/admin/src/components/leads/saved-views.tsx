"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@prosfin/ui";
import { Filter, ChevronDown, Bookmark } from "lucide-react";
import { showToast } from "@/lib/toast";

interface SavedView {
  id: string;
  name: string;
  params: Record<string, string>;
}

const STORAGE_KEY = "prosfin-saved-views";

const defaultViews: SavedView[] = [
  {
    id: "my-new-leads",
    name: "My New Leads",
    params: { owner: "You", status: "new" },
  },
  {
    id: "qualified-high-fit",
    name: "Qualified – High Fit",
    params: { status: "qualified" },
  },
  {
    id: "facebook-this-week",
    name: "Facebook – This Week",
    params: { source: "Facebook" },
  },
];

function loadSavedViews(): SavedView[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    // Ignore
  }
  return defaultViews;
}

function saveViews(views: SavedView[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(views));
  } catch (error) {
    // Ignore
  }
}

export function SavedViews() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [views, setViews] = React.useState<SavedView[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setViews(loadSavedViews());
    setHydrated(true);
  }, []);

  const applyView = (view: SavedView) => {
    const params = new URLSearchParams();
    
    // Apply view params
    Object.entries(view.params).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    // Preserve existing params that are not in view
    searchParams.forEach((value, key) => {
      if (!view.params[key] && key !== "view") {
        params.set(key, value);
      }
    });

    params.set("view", view.id);
    router.push(`/leads?${params.toString()}`);
    showToast.info(`Applied view: ${view.name}`);
  };

  if (!hydrated) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <Filter className="mr-2 size-3" />
          Views
          <ChevronDown className="ml-2 size-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {views.map((view) => (
          <DropdownMenuItem
            key={view.id}
            onClick={() => applyView(view)}
            className={searchParams.get("view") === view.id ? "bg-muted" : ""}
          >
            <Bookmark className="mr-2 size-3" />
            {view.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled className="text-muted-foreground text-xs">
          Save current view (coming soon)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

