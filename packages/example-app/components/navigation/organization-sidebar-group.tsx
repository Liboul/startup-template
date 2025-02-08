import { api } from '@/trpc/server';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@startup-template/ui/components/sidebar';
import { BuildingIcon } from 'lucide-react';
import { OrgNavigationItems } from './org-navigation-items';

export function OrganizationSidebarGroup() {
  const activeOrganization = api.organization.getActive();

  if (!activeOrganization) {
    return null;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex items-center gap-2">
        <BuildingIcon className="h-4 w-4" />
        <span>Organization</span>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <OrgNavigationItems />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
