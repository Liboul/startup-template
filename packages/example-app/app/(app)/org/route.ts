import { getSessionOrThrow } from '@/auth/get-session';
import { redirect } from 'next/navigation';

export const GET = async () => {
  const {
    session: { activeOrganizationId },
  } = await getSessionOrThrow();
  if (activeOrganizationId) {
    return redirect(`/org/dashboard`);
  }
  return redirect('/org/onboarding');
};
