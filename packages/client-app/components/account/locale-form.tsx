'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { LocaleSwitcher } from '@/components/navigation/locale-switcher';
import { useTranslations } from 'next-intl';

export function LocaleForm() {
  const t = useTranslations('account.settings.locale');

  return (
    <Card className="min-w-[400px]">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>
          {t('description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LocaleSwitcher />
      </CardContent>
    </Card>
  );
}
