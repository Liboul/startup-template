export const availableLocales = ['en', 'fr'] as const;
export type Locale = (typeof availableLocales)[number];

export const COOKIE_LOCALE_NAME = 'locale';