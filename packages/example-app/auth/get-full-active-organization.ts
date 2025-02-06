import { auth } from '@startup-template/auth';
import { headers } from 'next/headers';
import { getSessionOrThrow } from './get-session';

export async function getFullActiveOrganization() {
  const {
    session: { activeOrganizationId },
  } = await getSessionOrThrow();

  if (!activeOrganizationId) return null;

  const activeOrganization = await auth.api.getFullOrganization({
    query: { organizationId: activeOrganizationId },
    headers: await headers(),
  });

  return activeOrganization;
}
