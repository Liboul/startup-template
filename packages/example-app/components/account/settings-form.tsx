'use client';

import { authClient } from '@/auth/client';
import { Button } from '@startup-template/ui/components/button';
import {
  Card,
  CardContent,
  CardFooter,
} from '@startup-template/ui/components/card';
import { Input } from '@startup-template/ui/components/input';
import { useState } from 'react';
import { toast } from 'sonner';
import { User } from 'better-auth';

interface AccountSettingsFormProps {
  user: User;
}

export function AccountSettingsForm({ user }: AccountSettingsFormProps) {
  const [name, setName] = useState(user.name);

  const handleSave = async () => {
    try {
      await authClient.updateUser({
        name,
      });
      toast.success('Profile updated successfully');
    } catch {
      toast.error('Failed to update profile');
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
            Name
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="max-w-xl"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none mb-2 block"
          >
            Email
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
          Save changes
        </Button>
      </CardFooter>
    </Card>
  );
}
