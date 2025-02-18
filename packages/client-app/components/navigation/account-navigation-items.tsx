'use client';

import { LayoutDashboard, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@repo/ui/components/sidebar';
import { useTranslations } from 'next-intl';

export function AccountNavigationItems() {
  const pathname = usePathname();
  const t = useTranslations('navigation.account');

  const sidebarNavItems = [
    {
      title: t('dashboard'),
      href: '/account/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: t('settings'),
      href: '/account/settings',
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
