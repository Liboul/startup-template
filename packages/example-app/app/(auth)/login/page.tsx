import { getSession } from '@/auth/get-session';
import Login from '@/components/auth/login';
import { redirect } from 'next/navigation';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackURL?: string }>;
}) {
  const session = await getSession();
  if (session?.user) {
    const { callbackURL } = await searchParams;
    return redirect(callbackURL || '/');
  }

  return <Login />;
}
