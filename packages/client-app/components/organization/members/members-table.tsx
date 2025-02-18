import type { Member } from '@prisma/client';
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@repo/ui/components/table';
import { useTranslations } from 'next-intl';

type MemberWithUser = Member & {
  user: {
    email: string;
  };
};

interface MembersTableProps {
  members: MemberWithUser[];
}

export function MembersTable({ members }: MembersTableProps) {
  const t = useTranslations('organization.members.list');

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">{t('title')}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('user')}</TableHead>
            <TableHead>{t('joined')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.user.email}</TableCell>
              <TableCell>{new Date(member.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 