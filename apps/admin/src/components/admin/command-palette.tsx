"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "cmdk";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Megaphone,
  FileText,
  Image,
  Settings,
  Search,
} from "lucide-react";
import { getNavigationCommands, getActionCommands, searchLeads, searchClients, searchCampaigns } from "@/lib/commands";
import type { Lead, Client, Campaign } from "@/types/admin";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [entities, setEntities] = React.useState<{
    leads: Lead[];
    clients: Client[];
    campaigns: Campaign[];
  }>({ leads: [], clients: [], campaigns: [] });
  const [isSearching, setIsSearching] = React.useState(false);

  // Debounce search
  React.useEffect(() => {
    if (!search.trim()) {
      setEntities({ leads: [], clients: [], campaigns: [] });
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      const [leads, clients, campaigns] = await Promise.all([
        searchLeads(search),
        searchClients(search),
        searchCampaigns(search),
      ]);
      setEntities({ leads, clients, campaigns });
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const navCommands = React.useMemo(
    () => getNavigationCommands(router),
    [router]
  );
  const actionCommands = React.useMemo(
    () => getActionCommands(router),
    [router]
  );

  const handleSelect = (action: () => void) => {
    action();
    onOpenChange(false);
    setSearch("");
  };

  const hasEntities =
    entities.leads.length > 0 ||
    entities.clients.length > 0 ||
    entities.campaigns.length > 0;

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." value={search} onValueChange={setSearch} />
      <CommandList>
        <CommandEmpty>
          {isSearching ? "Searching..." : "No results found."}
        </CommandEmpty>

        {/* Navigation */}
        {!search.trim() && (
          <CommandGroup heading="Navigate">
            {navCommands.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <CommandItem
                  key={cmd.id}
                  onSelect={() => handleSelect(cmd.action)}
                  keywords={cmd.keywords}
                >
                  {Icon && <Icon className="mr-2 size-4" />}
                  <span>{cmd.label}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}

        {/* Entities (when searching) */}
        {search.trim() && (
          <>
            {entities.leads.length > 0 && (
              <CommandGroup heading="Leads">
                {entities.leads.slice(0, 5).map((lead) => (
                  <CommandItem
                    key={lead.id}
                    onSelect={() => handleSelect(() => router.push(`/leads/${lead.id}`))}
                  >
                    <Users className="mr-2 size-4" />
                    <span>{lead.name}</span>
                    {lead.company && (
                      <span className="ml-2 text-muted-foreground">
                        - {lead.company}
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {entities.clients.length > 0 && (
              <CommandGroup heading="Clients">
                {entities.clients.slice(0, 5).map((client) => (
                  <CommandItem
                    key={client.id}
                    onSelect={() => handleSelect(() => router.push(`/clients/${client.id}`))}
                  >
                    <UserCheck className="mr-2 size-4" />
                    <span>{client.companyName}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {entities.campaigns.length > 0 && (
              <CommandGroup heading="Campaigns">
                {entities.campaigns.slice(0, 5).map((campaign) => (
                  <CommandItem
                    key={campaign.id}
                    onSelect={() => handleSelect(() => router.push(`/campaigns?campaign=${campaign.id}`))}
                  >
                    <Megaphone className="mr-2 size-4" />
                    <span>{campaign.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </>
        )}

        {/* Actions */}
        {!search.trim() && (
          <CommandGroup heading="Actions">
            {actionCommands.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <CommandItem
                  key={cmd.id}
                  onSelect={() => handleSelect(cmd.action)}
                  keywords={cmd.keywords}
                >
                  {Icon && <Icon className="mr-2 size-4" />}
                  <span>{cmd.label}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}

