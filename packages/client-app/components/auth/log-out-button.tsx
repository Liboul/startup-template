'use client';

import { authClient } from '@/auth/client';
import { Button } from '@repo/ui/components/button';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export function LogOutButton() {
  const router = useRouter();
  const t = useTranslations('auth');

  return (
    <Button
      onClick={async () => {
        await authClient.signOut();
        router.push('/');
      }}
    >
      {t('logout')}
    </Button>
  );
}
