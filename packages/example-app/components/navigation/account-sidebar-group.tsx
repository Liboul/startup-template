'use client';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@startup-template/ui/components/sidebar';
import { AccountNavigationItems } from './account-navigation-items';
import { UserIcon } from 'lucide-react';

export function AccountSidebarGroup() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex items-center gap-2">
        <UserIcon className="h-4 w-4" />
        <span>Account</span>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <AccountNavigationItems />
      </SidebarGroupContent>
    </SidebarGroup>
  );
} 