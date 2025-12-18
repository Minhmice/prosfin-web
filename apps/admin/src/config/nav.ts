import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Settings,
  BarChart3,
  Zap,
  Image,
  Calendar,
  MessageSquare,
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

// Main navigation group
export const mainNavItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Clients", href: "/crm/clients", icon: Building2 },
  { label: "Leads", href: "/crm/leads", icon: Users },
  { label: "Reports", href: "/crm/reports", icon: BarChart3 },
  { label: "Automation", href: "/crm/automation", icon: Zap },
];

// Secondary navigation group (Content)
export const secondaryNavItems: NavItem[] = [
  { label: "Content Dashboard", href: "/content", icon: FileText },
  {
    label: "Posts",
    href: "/content/posts",
    icon: FileText,
    children: [
      { label: "All Posts", href: "/content/posts", icon: FileText },
      { label: "Drafts", href: "/content/posts/drafts", icon: FileText },
      { label: "Scheduled", href: "/content/posts/scheduled", icon: FileText },
    ],
  },
  { label: "Media", href: "/content/media", icon: Image },
  { label: "Schedules", href: "/content/schedules", icon: Calendar },
  { label: "Comments", href: "/content/comments", icon: MessageSquare },
];

// Legacy format for backward compatibility
export const navGroups: NavGroup[] = [
  {
    label: "Main",
    items: mainNavItems,
  },
  {
    label: "Secondary",
    items: secondaryNavItems,
  },
];
