import { auth } from '@startup-template/auth';
import { headers } from 'next/headers';
import { cache } from 'react';

export const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});

// This function should only be called in protected routes, so a session should always exist
export const getSessionOrThrow = async () => {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');
  return session;
};
