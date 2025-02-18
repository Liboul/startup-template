'use client';

import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import { SidebarMenuButton } from '@repo/ui/components/sidebar';
import { availableLocales, Locale } from '@/i18n/types';
import { setLocale } from '@/i18n/setLocale';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

export function LocaleSwitcher() {
  const router = useRouter();
  const locale = useLocale() as Locale;
  const t = useTranslations('navigation.locale_switcher.languages');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          <Globe className="h-4 w-4" />
          <span>{t(locale)}</span>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {availableLocales.map((locale) => (
          <form
            key={locale}
            action={async (formData) => {
              await setLocale(formData);
              router.refresh();
            }}
          >
            <input type="hidden" name="locale" value={locale} />
            <DropdownMenuItem asChild>
              <button type="submit" className="w-full">
                {t(locale)}
              </button>
            </DropdownMenuItem>
          </form>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
