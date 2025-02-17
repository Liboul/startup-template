'use server';

import { cookies } from 'next/headers';
import { COOKIE_LOCALE_NAME } from './types';

export async function setLocale(formData: FormData) {
  const locale = formData.get('locale')?.toString();
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_LOCALE_NAME, locale || 'en');
}
