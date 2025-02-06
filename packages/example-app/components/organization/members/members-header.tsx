import { Button } from '@startup-template/ui/components/button';
import { Plus } from 'lucide-react';
import { InviteMemberDialog } from './invite-member-dialog';
import { DialogTrigger } from '@startup-template/ui/components/dialog';

export function MembersHeader() {
  return (
    <div className="flex items-center justify-between gap-4">
      <h1 className="text-2xl font-bold">Organization Members</h1>
      <InviteMemberDialog
        trigger={
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" />
              Invite teammates
            </Button>
          </DialogTrigger>
        }
      />
    </div>
  );
}
