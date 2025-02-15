'use client';

import { authClient } from '@/auth/client';
import { Button } from '@repo/ui/components/button';
import { useRouter } from 'next/navigation';

export function LogOutButton() {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        await authClient.signOut();
        router.push('/');
      }}
    >
      Logout
    </Button>
  );
}
