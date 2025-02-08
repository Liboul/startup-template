'use client';

import { useRouter } from 'next/navigation';
import { authClient } from '@/auth/client';
import type { RouterOutput } from '@startup-template/api';
import { cn } from '@startup-template/ui';
import { DropdownMenuItem } from '@startup-template/ui/components/dropdown-menu';
interface OrganizationMenuItemsProps {
  activeOrganization: RouterOutput['organization']['getActive'];
}

export function OrganizationMenuItems({
  activeOrganization,
}: OrganizationMenuItemsProps) {
  const { data } = authClient.useListOrganizations();
  const organizations = data ?? [];
  const router = useRouter();

  return (
    <>
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
            router.refresh()
          }}
        >
          {organization.name}
        </DropdownMenuItem>
      ))}
    </>
  );
}
