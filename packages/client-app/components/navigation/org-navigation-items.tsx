'use client';

import { LayoutDashboard, Settings, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@repo/ui/components/sidebar';
import { useTranslations } from 'next-intl';

export function OrgNavigationItems() {
  const pathname = usePathname();
  const t = useTranslations('navigation.organization');

  const sidebarNavItems = [
    {
      title: t('dashboard'),
      href: `/org/dashboard`,
      icon: LayoutDashboard,
    },
    {
      title: t('members'),
      href: `/org/members`,
      icon: Users,
    },
    {
      title: t('settings'),
      href: `/org/settings`,
      icon: Settings,
    },
  ] as const;

  return (
    <SidebarMenu>
      {sidebarNavItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton asChild isActive={pathname.includes(item.href)}>
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
