import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  children?: NavItem[];
};

export type NavGroup = {
  label?: string;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    label: "Core",
    items: [
      { label: "Dashboard", href: "/", icon: LayoutDashboard },
    ],
  },
  {
    label: "CRM",
    items: [
      { label: "Leads", href: "/leads", icon: Users },
      { label: "Clients", href: "/clients", icon: Building2 },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Content", href: "/content", icon: FileText },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];
