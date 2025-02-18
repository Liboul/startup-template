'use client';

import { authClient } from '@/auth/client';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardFooter,
} from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import { useState } from 'react';
import { toast } from 'sonner';
import { User } from 'better-auth';
import { useTranslations } from 'next-intl';

interface AccountSettingsFormProps {
  user: User;
}

export function AccountSettingsForm({ user }: AccountSettingsFormProps) {
  const [name, setName] = useState(user.name);
  const t = useTranslations('account.settings.form');

  const handleSave = async () => {
    try {
      await authClient.updateUser({
        name,
      });
      toast.success(t('success'));
    } catch {
      toast.error(t('error'));
    }
  };

  return (
    <Card className="min-w-[400px]">
      <CardContent className="space-y-6 pt-6">
        <div>
          <label
            htmlFor="name"
            className="text-sm font-medium leading-none mb-2 block"
          >
            {t('name.label')}
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="max-w-xl"
            placeholder={t('name.placeholder')}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none mb-2 block"
          >
            {t('email.label')}
          </label>
          <Input
            id="email"
            value={user.email}
            disabled
            className="max-w-xl bg-muted mb-2"
          />
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button onClick={handleSave} size="lg" className="min-w-[160px]">
          {t('submit')}
        </Button>
      </CardFooter>
    </Card>
  );
}
