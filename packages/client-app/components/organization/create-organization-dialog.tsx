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
import { useTranslations } from 'next-intl';

interface CreateOrganizationDialogProps {
  trigger: React.ReactNode;
}

export function CreateOrganizationDialog({
  trigger,
}: CreateOrganizationDialogProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations('organization.create');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BuildingIcon className="h-8 w-8" />
            <span>{t('title')}</span>
          </DialogTitle>
          <DialogDescription>
            {t('description')}
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
