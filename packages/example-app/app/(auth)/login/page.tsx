import { getSession } from '@/auth/get-session';
import Login from '@/components/auth/login';
import { Logo } from '@/components/logo';
import { Invitation, Organization, User } from '@prisma/client';
import { redirect } from 'next/navigation';
import { db } from '@startup-template/db';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@startup-template/ui/components/alert';
import { MailPlusIcon } from 'lucide-react';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackURL?: string }>;
}) {
  const session = await getSession();
  const { callbackURL } = await searchParams;
  if (session?.user) {
    return redirect(callbackURL || '/');
  }
  const invitationId = callbackURL ? getInvitationId(callbackURL) : null;
  const invitation = invitationId ? await getInvitation(invitationId) : null;

  return (
    <div className="flex min-h-[100dvh] items-center justify-center p-8">
      <div className="max-w-[500px] flex flex-col items-center gap-4">
        <div className="flex justify-center">
          <Logo />
        </div>
        {invitation && <InvitationInfo invitation={invitation} />}
        <Login callbackURL={callbackURL} />
      </div>
    </div>
  );
}

function getInvitationId(url: string) {
  if (!url.startsWith('/accept-invitation/')) return null;
  return url.split('/')[2];
}

async function getInvitation(invitationId: string) {
  return db.invitation.findUnique({
    where: { id: invitationId },
    include: {
      organization: true,
      user: true,
    },
  });
}

function InvitationInfo({
  invitation,
}: {
  invitation: Invitation & { organization: Organization; user: User };
}) {
  return (
    <Alert>
      <MailPlusIcon className="h-4 w-4" />
      <AlertTitle>
        Join {invitation.organization.name} on Startup Template
      </AlertTitle>
      <AlertDescription className="text-muted-foreground">
        You have been invited by {invitation.user.email} to join{' '}
        {invitation.organization.name}.
      </AlertDescription>
    </Alert>
  );
}
