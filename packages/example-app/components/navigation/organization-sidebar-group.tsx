'use client';

import { authClient } from '@/auth/client';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@startup-template/ui/components/sidebar';
import { OrgNavigationItems } from './org-navigation-items';
import { BuildingIcon } from 'lucide-react';

export function OrganizationSidebarGroup() {
  const { data: activeOrganization } = authClient.useActiveOrganization();

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
