'use client';

import { LayoutDashboard, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@startup-template/ui/components/sidebar';

export function AccountNavigationItems() {
  const pathname = usePathname();

  const sidebarNavItems = [
    {
      title: 'Dashboard',
      href: '/account/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Settings',
      href: '/account/settings',
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
