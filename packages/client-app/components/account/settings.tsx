'use client';

import { authClient } from '@/auth/client';
import { Loader2 } from 'lucide-react';
import { AccountSettingsForm } from './settings-form';
export function AccountSettings() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Loader2 className="animate-spin h-4 w-4" />;
  }

  if (!session?.user) {
    return null;
  }

  return <AccountSettingsForm user={session.user} />;
}
