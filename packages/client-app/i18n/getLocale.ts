import { cookies } from 'next/headers';
import { availableLocales, COOKIE_LOCALE_NAME, Locale } from './types';
import { headers } from 'next/headers';

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const localeInCookie = cookieStore.get(COOKIE_LOCALE_NAME)?.value;
  if (availableLocales.includes(localeInCookie as Locale))
    return localeInCookie as Locale;

  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  const localesInAcceptLanguage = acceptLanguage
    .split(',')
    // [0] because we don't localize the language, remove this if we do
    .map((acceptedLanguage) => acceptedLanguage.split('-')[0].trim());
  const localeInAcceptLanguage = localesInAcceptLanguage.find((locale) =>
    availableLocales.includes(locale as Locale),
  );
  if (localeInAcceptLanguage) return localeInAcceptLanguage as Locale;
  return 'en';
}
