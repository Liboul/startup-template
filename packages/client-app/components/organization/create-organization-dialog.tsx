'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/dialog';
import { useState } from 'react';
import { CreateOrganizationForm } from './create-organization-form';
import { BuildingIcon } from 'lucide-react';

interface CreateOrganizationDialogProps {
  trigger: React.ReactNode;
}

export function CreateOrganizationDialog({
  trigger,
}: CreateOrganizationDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BuildingIcon className="h-8 w-8" />
            <span>Create Organization</span>
          </DialogTitle>
          <DialogDescription>
            Unless you are expecting an invitation?
          </DialogDescription>
        </DialogHeader>
        <CreateOrganizationForm
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
