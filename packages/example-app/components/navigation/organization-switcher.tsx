'use client';

import { ChevronsUpDown, Plus } from 'lucide-react';

import { authClient } from '@/auth/client';
import { Logo } from '@/components/logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@startup-template/ui/components/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@startup-template/ui/components/sidebar';
import { cn } from '@startup-template/ui';
import { useRouter } from 'next/navigation';

export function OrganizationSwitcher() {
  const { data } = authClient.useListOrganizations();
  const organizations = data ?? [];
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const router = useRouter();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Logo size="sm" />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeOrganization?.name || 'Switch organization'}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side="right"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Organizations
            </DropdownMenuLabel>
            {organizations.map((organization) => (
              <DropdownMenuItem
                key={organization.id}
                className={cn(
                  'gap-2 p-2',
                  activeOrganization?.id === organization.id &&
                    'bg-sidebar-accent text-sidebar-accent-foreground',
                )}
                onClick={async () => {
                  await authClient.organization.setActive({
                    organizationId: organization.id,
                  });
                  router.push('/org');
                }}
              >
                {organization.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => {
                authClient.organization.create({
                  name: 'Google',
                  slug: 'google',
                });
              }}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Create organization
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
