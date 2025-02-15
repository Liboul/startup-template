'use client';

import { LayoutDashboard, Settings, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@repo/ui/components/sidebar';

export function OrgNavigationItems() {
  const pathname = usePathname();

  const sidebarNavItems = [
    {
      title: 'Dashboard',
      href: `/org/dashboard`,
      icon: LayoutDashboard,
    },
    {
      title: 'Members',
      href: `/org/members`,
      icon: Users,
    },
    {
      title: 'Settings',
      href: `/org/settings`,
      icon: Settings,
    },
  ] as const;

  return (
    <SidebarMenu>
      {sidebarNavItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton asChild isActive={pathname === item.href}>
            <Link href={item.href}>
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
