import { authClient } from '@/auth/client';
import type { Invitation } from '@prisma/client';
import { Button } from '@repo/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/table';
import { MoreHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

interface InvitationsTableProps {
  invitations: Invitation[];
}

export function InvitationsTable({ invitations }: InvitationsTableProps) {
  const t = useTranslations('organization.members.invitations');

  const handleCancel = async (invitationId: string) => {
    try {
      const result = await authClient.organization.cancelInvitation({
        invitationId,
      });

      if (result.error) {
        toast.error(t('cancel_error'));
        return;
      }

      toast.success(t('cancel_success'));
    } catch {
      toast.error(t('cancel_error_generic'));
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">{t('title')}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('email')}</TableHead>
            <TableHead>{t('expires')}</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitations.map((invitation) => (
            <TableRow key={invitation.id}>
              <TableCell>{invitation.email}</TableCell>
              <TableCell>
                {new Date(invitation.expiresAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleCancel(invitation.id)}
                    >
                      {t('cancel')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
