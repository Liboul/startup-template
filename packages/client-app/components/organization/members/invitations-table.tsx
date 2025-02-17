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
import { toast } from 'sonner';

interface InvitationsTableProps {
  invitations: Invitation[];
}

export function InvitationsTable({ invitations }: InvitationsTableProps) {
  const handleCancel = async (invitationId: string) => {
    try {
      const result = await authClient.organization.cancelInvitation({
        invitationId,
      });

      if (result.error) {
        toast.error('Failed to cancel invitation');
        return;
      }

      toast.success('Invitation cancelled');
    } catch {
      toast.error('An error occurred while cancelling the invitation');
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Pending Invitations</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Expires</TableHead>
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
                      Cancel
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
