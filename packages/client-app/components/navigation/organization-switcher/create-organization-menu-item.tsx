'use client';

import { Plus } from 'lucide-react';
import { DialogTrigger } from '@repo/ui/components/dialog';
import { DropdownMenuItem } from '@repo/ui/components/dropdown-menu';
import { CreateOrganizationDialog } from '@/components/organization/create-organization-dialog';
import { useTranslations } from 'next-intl';

export function CreateOrganizationMenuItem() {
  const t = useTranslations('navigation.organization_switcher');
  
  return (
    <CreateOrganizationDialog
      trigger={
        <DialogTrigger asChild>
          <DropdownMenuItem
            className="gap-2 p-2"
            onSelect={(e) => {
              // Prevent the dropdown from closing
              e.preventDefault();
            }}
          >
            <div className="flex size-6 items-center justify-center rounded-md border bg-background">
              <Plus className="size-4" />
            </div>
            <div className="font-medium text-muted-foreground">
              {t('create')}
            </div>
          </DropdownMenuItem>
        </DialogTrigger>
      }
    />
  );
} 