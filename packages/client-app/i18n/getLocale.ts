import { cookies } from 'next/headers';
import { availableLocales, COOKIE_LOCALE_NAME, Locale } from './types';

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const localeInCookie = cookieStore.get(COOKIE_LOCALE_NAME)?.value;
  return availableLocales.includes(localeInCookie as Locale)
    ? (localeInCookie as Locale)
    : 'en';
}
