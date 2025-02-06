import { getFullActiveOrganization } from '@/auth/get-full-active-organization';
import { InvitationsTable } from '@/components/organization/members/invitations-table';
import { MembersHeader } from '@/components/organization/members/members-header';
import { MembersTable } from '@/components/organization/members/members-table';
import { filterPendingInvitations } from '@/components/organization/members/utils/invitations';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function OrganizationMembersPage() {
  const activeOrganization = await getFullActiveOrganization();

  if (!activeOrganization) return redirect('/');

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
