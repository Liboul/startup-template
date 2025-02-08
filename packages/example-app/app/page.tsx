import { getSession } from '@/auth/get-session';
import { LogOutButton } from '@/components/auth/log-out-button';
import { Button } from '@startup-template/ui/components/button';
import Link from 'next/link';

export default async function Home() {
  const session = await getSession();

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">
        Starter template for your next startup
      </h2>
      <h3 className="text-xl">/ would contain a landing page. Login to see the app</h3>

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
    </div>
  );
}
