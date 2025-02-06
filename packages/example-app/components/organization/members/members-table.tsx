import type { Member } from '@prisma/client';
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@startup-template/ui/components/table';

type MemberWithUser = Member & {
  user: {
    email: string;
  };
};

interface MembersTableProps {
  members: MemberWithUser[];
}

export function MembersTable({ members }: MembersTableProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Members</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Joined</TableHead>
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