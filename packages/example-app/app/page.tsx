import { getSession } from '@/auth/get-session';
import { LogOutButton } from '@/components/auth/log-out-button';
import { HydrateClient } from '@/trpc/server';
import { Button } from '@startup-template/ui/components/button';
import Link from 'next/link';

export default async function Home() {
  const session = await getSession();

  return (
    <HydrateClient>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      <h2 className="text-2xl font-bold">Button from design system package</h2>
      <Button>Click me</Button>

      {session?.user ? (
        <div>
          <p>User: {session.user.email}</p>
          <LogOutButton />
        </div>
      ) : (
        <p>
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </p>
      )}
    </HydrateClient>
  );
}
