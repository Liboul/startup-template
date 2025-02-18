import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata() {
  const t = await getTranslations('account.dashboard');
  return {
    title: t('title')
  };
}

export default function AccountDashboardPage() {
  const t = useTranslations('account.dashboard');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <p className="mt-2 text-gray-500">{t('welcome')}</p>
    </div>
  );
}
