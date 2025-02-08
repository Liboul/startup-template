'use client';

import { Plus } from 'lucide-react';
import { DialogTrigger } from '@startup-template/ui/components/dialog';
import { DropdownMenuItem } from '@startup-template/ui/components/dropdown-menu';
import { CreateOrganizationDialog } from '@/components/organization/create-organization-dialog';

export function CreateOrganizationMenuItem() {
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
              Create organization
            </div>
          </DropdownMenuItem>
        </DialogTrigger>
      }
    />
  );
} 