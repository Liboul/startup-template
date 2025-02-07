import { db } from '@startup-template/db';

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