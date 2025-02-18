import { AccountSettings } from '@/components/account/settings';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata() {
  const t = await getTranslations('account.settings');
  return {
    title: t('title')
  };
}

export default function AccountSettingsPage() {
  const t = useTranslations('account.settings');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <p className="mt-2 text-gray-500">{t('description')}</p>
      <div className="mt-8 max-w-2xl">
        <AccountSettings />
      </div>
    </div>
  );
}
