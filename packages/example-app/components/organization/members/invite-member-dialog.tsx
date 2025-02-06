'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
            <span>Invite teammates</span>
          </DialogTitle>
          <DialogDescription>
            Invite your team members to collaborate. Enter their work emails to
            send invites.
          </DialogDescription>
        </DialogHeader>
        <InviteMemberForm
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
