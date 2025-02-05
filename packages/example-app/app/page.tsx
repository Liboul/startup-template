import { getSession } from '@/auth/get-session';
import { HydrateClient } from '@/trpc/server';
import { Button } from '@startup-template/ui/components/button';

export default async function Home() {
  const session = await getSession();

  return (
    <HydrateClient>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      <h2 className="text-2xl font-bold">Button from design system package</h2>

      <Button>Click me</Button>

      {session?.user ? <p>User: {session.user.email}</p> : <p>No user</p>}
    </HydrateClient>
  );
}
