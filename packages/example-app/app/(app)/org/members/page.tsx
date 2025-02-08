'use client';

import { authClient } from '@/auth/client';
import { InvitationsTable } from '@/components/organization/members/invitations-table';
import { MembersHeader } from '@/components/organization/members/members-header';
import { MembersTable } from '@/components/organization/members/members-table';
import { filterPendingInvitations } from '@/components/organization/members/utils/invitations';

export default function OrganizationMembersPage() {
  const { data: activeOrganization, isPending } =
    authClient.useActiveOrganization();

  if (isPending || !activeOrganization) {
    return '';
  }

  const pendingInvitations = filterPendingInvitations(
    activeOrganization.invitations,
  );

  return (
    <div className="p-6 space-y-6 min-w-[600px]">
      <MembersHeader />
      <div className="space-y-6">
        <MembersTable members={activeOrganization.members} />
        {pendingInvitations.length > 0 && (
          <InvitationsTable invitations={pendingInvitations} />
        )}
      </div>
    </div>
  );
}
