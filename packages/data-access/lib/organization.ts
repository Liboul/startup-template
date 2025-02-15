import { db } from '@repo/db';

export async function findFirstOrganizationByUserId(userId: string) {
  return db.organization.findFirst({
    where: {
      members: { some: { userId } },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function findOrganizationById(organizationId: string) {
  return db.organization.findUnique({
    where: { id: organizationId },
  });
}
