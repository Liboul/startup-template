import { Button } from '@repo/ui/components/button';
import { Plus } from 'lucide-react';
import { InviteMemberDialog } from './invite-member-dialog';
import { DialogTrigger } from '@repo/ui/components/dialog';
import { useTranslations } from 'next-intl';

export function MembersHeader() {
  const t = useTranslations('organization.members');

  return (
    <div className="flex items-center justify-between gap-4">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <InviteMemberDialog
        trigger={
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" />
              {t('invite.title')}
            </Button>
          </DialogTrigger>
        }
      />
    </div>
  );
}
