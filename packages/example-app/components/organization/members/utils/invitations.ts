import type { Invitation } from '@prisma/client';

export function filterPendingInvitations(invitations: Invitation[]): Invitation[] {
  return invitations.filter((invitation) => invitation.status === 'pending');
} 