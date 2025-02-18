'use client';

import { authClient } from '@/auth/client';
import { Loader2 } from 'lucide-react';
import { OrganizationSettingsForm } from './settings-form';

export function OrganizationSettings() {
  const { data: activeOrganization, isPending } =
    authClient.useActiveOrganization();

  if (isPending || !activeOrganization) {
    return <Loader2 className="animate-spin h-4 w-4" />;
  }

  return <OrganizationSettingsForm organization={activeOrganization} />;
}
