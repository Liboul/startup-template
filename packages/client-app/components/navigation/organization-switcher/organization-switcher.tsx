import { ChevronsUpDown } from 'lucide-react';

import { Logo } from '@/components/logo';
import { api } from '@/trpc/server';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@repo/ui/components/sidebar';
import { CreateOrganizationMenuItem } from './create-organization-menu-item';
import { OrganizationMenuItems } from './organization-menu-items';
import { getTranslations } from 'next-intl/server';

export async function OrganizationSwitcher() {
  const activeOrganization = await api.organization.getActive();
  const t = await getTranslations('navigation.organization_switcher');

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
                  {activeOrganization?.name || t('switch')}
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
              {t('organizations')}
            </DropdownMenuLabel>
            <OrganizationMenuItems activeOrganization={activeOrganization} />
            <DropdownMenuSeparator />
            <CreateOrganizationMenuItem />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
