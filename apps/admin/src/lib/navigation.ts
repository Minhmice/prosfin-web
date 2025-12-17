import * as React from "react";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Megaphone,
  FileText,
  Image,
  Settings,
  ChevronRight,
  FileStack,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: NavItem[];
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    label: "Main",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Leads",
        href: "/leads",
        icon: Users,
      },
      {
        title: "Clients",
        href: "/clients",
        icon: UserCheck,
      },
      {
        title: "Campaigns",
        href: "/campaigns",
        icon: Megaphone,
      },
    ],
  },
  {
    label: "Content",
    items: [
      {
        title: "Content",
        href: "/content",
        icon: FileText,
      },
      {
        title: "Documents",
        href: "/documents",
        icon: FileStack,
      },
      {
        title: "Media",
        href: "/media",
        icon: Image,
      },
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];

// Flattened for backward compatibility
export const navItems: NavItem[] = navGroups.flatMap((group) => group.items);
