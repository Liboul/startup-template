'use client';

import { authClient } from '@/auth/client';
import { Loader2 } from 'lucide-react';
import { AccountSettingsForm } from './settings-form';
import { LocaleForm } from './locale-form';

export function AccountSettings() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Loader2 className="animate-spin h-4 w-4" />;
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <AccountSettingsForm user={session.user} />
      <LocaleForm />
    </div>
  );
}
