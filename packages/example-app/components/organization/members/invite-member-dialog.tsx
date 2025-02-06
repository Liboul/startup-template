'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@startup-template/ui/components/dialog';
import { useState } from 'react';
import { InviteMemberForm } from './invite-member-form';
import { UsersIcon } from 'lucide-react';

interface InviteMemberDialogProps {
  trigger: React.ReactNode;
}

export function InviteMemberDialog({ trigger }: InviteMemberDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UsersIcon className="h-8 w-8" />
            <span>Invite Member</span>
          </DialogTitle>
        </DialogHeader>
        <InviteMemberForm
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
} 