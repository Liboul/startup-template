'use client';

import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { CheckIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@repo/ui/components/skeleton';
import { authClient } from '@/auth/client';
import { InvitationError } from './invitation-error';
import { useTranslations } from 'next-intl';

interface AcceptInvitationProps {
  invitationId: string;
}

export function AcceptInvitation({ invitationId }: AcceptInvitationProps) {
  const router = useRouter();
  const t = useTranslations('organization.accept_invitation');
  const [invitationStatus, setInvitationStatus] = useState<
    'pending' | 'accepted' | 'rejected'
  >('pending');

  const handleAccept = async () => {
    await authClient.organization
      .acceptInvitation({
        invitationId,
      })
      .then((res) => {
        if (res.error) {
          setError(res.error.message || t('error'));
        } else {
          setInvitationStatus('accepted');
          router.push(`/org`);
        }
      });
  };

  const handleReject = async () => {
    await authClient.organization
      .rejectInvitation({
        invitationId,
      })
      .then((res) => {
        if (res.error) {
          setError(res.error.message || t('error'));
        } else {
          setInvitationStatus('rejected');
        }
      });
  };

  const [invitation, setInvitation] = useState<{
    organizationName: string;
    organizationSlug: string;
    inviterEmail: string;
    id: string;
    status: 'pending' | 'accepted' | 'rejected' | 'canceled';
    email: string;
    expiresAt: Date;
    organizationId: string;
    role: string;
    inviterId: string;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    authClient.organization
      .getInvitation({
        query: {
          id: invitationId,
        },
      })
      .then((res) => {
        if (res.error) {
          setError(res.error.message || t('error'));
        } else {
          setInvitation(res.data);
        }
      });
  }, [invitationId, t]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {invitation ? (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>
              {t('description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {invitationStatus === 'pending' && (
              <div className="space-y-4">
                <p>
                  {t('invited_by', {
                    email: invitation.inviterEmail,
                    organization: invitation.organizationName
                  })}
                </p>
                <p>
                  {t('sent_to', { email: invitation.email })}
                </p>
              </div>
            )}
            {invitationStatus === 'accepted' && (
              <div className="space-y-4">
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full">
                  <CheckIcon className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-center">
                  {t('accepted.title', { organization: invitation.organizationName })}
                </h2>
                <p className="text-center">
                  {t('accepted.description')}
                </p>
              </div>
            )}
            {invitationStatus === 'rejected' && (
              <div className="space-y-4">
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full">
                  <XIcon className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-center">
                  {t('rejected.title')}
                </h2>
                <p className="text-center">
                  {t('rejected.description', { organization: invitation.organizationName })}
                </p>
              </div>
            )}
          </CardContent>
          {invitationStatus === 'pending' && (
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleReject}>
                {t('decline')}
              </Button>
              <Button onClick={handleAccept}>{t('accept')}</Button>
            </CardFooter>
          )}
        </Card>
      ) : error ? (
        <InvitationError />
      ) : (
        <InvitationSkeleton />
      )}
    </div>
  );
}

function InvitationSkeleton() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-2/3 mt-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Skeleton className="h-10 w-24" />
      </CardFooter>
    </Card>
  );
}
