import { getSession } from '@/auth/get-session';
import { LogOutButton } from '@/components/auth/log-out-button';
import { Button } from '@repo/ui/components/button';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata() {
  const t = await getTranslations('home');
  return {
    title: t('title')
  };
}

export default async function Home() {
  const session = await getSession();
  const t = await getTranslations('home');

  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">
        {t('title')}
      </h2>
      <h3 className="text-xl">
        {t('subtitle')}
      </h3>

      {session?.user ? (
        <div>
          <p>
            {t('signed_in_as', { email: session.user.email })}
          </p>
          <div>
            <LogOutButton />
          </div>
          <div>
            <Link href="/org/dashboard">{t('dashboard_link')}</Link>
          </div>
        </div>
      ) : (
        <p>
          <Button variant="outline" asChild>
            <Link href="/login">{t('login_link')}</Link>
          </Button>
        </p>
      )}
    </div>
  );
}
