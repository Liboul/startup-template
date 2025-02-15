import { db } from '@repo/db';

export async function findInvitationById(invitationId: string) {
  return db.invitation.findUnique({
    where: { id: invitationId },
    include: {
      organization: true,
      user: true,
    },
  });
}
