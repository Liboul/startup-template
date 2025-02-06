'use client';

import { authClient } from '@/auth/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, AlertDescription } from '@startup-template/ui/components/alert';
import { Button } from '@startup-template/ui/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@startup-template/ui/components/form';
import { Input } from '@startup-template/ui/components/input';
import { toast } from 'sonner';
import { AlertCircle, Plus } from 'lucide-react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';

const inviteMemberSchema = z.object({
  emails: z.array(
    z.object({
      email: z.string().email('Please enter a valid email address'),
    }),
  ),
});

type InviteMemberFormData = z.infer<typeof inviteMemberSchema>;

interface InviteMemberFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function InviteMemberForm({
  onSuccess,
  onCancel,
}: InviteMemberFormProps) {
  const form = useForm<InviteMemberFormData>({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: {
      emails: [{ email: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'emails',
  });

  async function onSubmit(data: InviteMemberFormData) {
    try {
      const promises = data.emails.map((field) =>
        authClient.organization.inviteMember({
          role: 'owner', // Everybody is an owner to start with, refine if necessary
          email: field.email,
        }),
      );

      const results = await Promise.all(promises);
      const errors = results.filter((result) => result.error);

      if (errors.length > 0) {
        form.setError('root', {
          message: 'Failed to invite some members. Please try again.',
        });
        return;
      }

      toast('Invitations have been sent');
      onSuccess();
    } catch {
      form.setError('root', {
        message: 'An error occurred while sending invitations',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {form.formState.errors.root && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {form.formState.errors.root.message}
            </AlertDescription>
          </Alert>
        )}
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-end gap-2">
              <FormField
                control={form.control}
                name={`emails.${index}.email`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <div className="flex gap-2 items-center">
                        <Input placeholder="member@example.com" {...field} />
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            className="mb-2"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
        <div>
          <Button
            type="button"
            variant="ghost"
            onClick={() => append({ email: '' })}
          >
            <Plus className="h-4 w-4" />
            Invite another member
          </Button>
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Invite</Button>
        </div>
      </form>
    </Form>
  );
}
