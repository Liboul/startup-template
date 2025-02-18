import { CreateOrganizationForm } from '@/components/organization/create-organization-form';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata() {
  const t = await getTranslations('organization.onboarding');
  return {
    title: t('title')
  };
}

export default function OrganizationOnboardingPage() {
  const t = useTranslations('organization.onboarding');

  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-3xl font-semibold">{t('title')}</h1>
      <p className="text-muted-foreground">
        {t('description')}
      </p>
      <CreateOrganizationForm />
    </div>
  );
}
