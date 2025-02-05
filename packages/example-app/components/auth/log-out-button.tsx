'use client';

import { authClient } from '@/auth/client';
import { Button } from '@startup-template/ui/components/button';
import { redirect } from 'next/navigation';

export function LogOutButton() {
  return (
    <Button
      onClick={async () => {
        await authClient.signOut();
        redirect('/');
      }}
    >
      Logout
    </Button>
  );
}
