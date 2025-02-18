'use client';

import { authClient } from '@/auth/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, AlertDescription } from '@repo/ui/components/alert';
import { Button } from '@repo/ui/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { toast } from 'sonner';
import { AlertCircle, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { useRef } from 'react';

interface InviteMemberFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function InviteMemberForm({
  onSuccess,
  onCancel,
}: InviteMemberFormProps) {
  const t = useTranslations('organization.members.invite_form');

  const inviteMemberSchema = z.object({
    emails: z.array(
      z.object({
        email: z.string().email(t('email.invalid')),
      }),
    ),
  });

  type InviteMemberFormData = z.infer<typeof inviteMemberSchema>;

  const formContainerRef = useRef<HTMLFormElement>(null);
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

  const handleAppend = () => {
    append({ email: '' });
    // Scroll to bottom after adding new field
    setTimeout(() => {
      if (formContainerRef.current) {
        formContainerRef.current.scrollTop = formContainerRef.current.scrollHeight;
      }
    }, 0);
  };

  // Handle paste event to add multiple emails at once
  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const emails = pastedText
      .split(/[,\n]/) // Split by comma or newline
      .map((email) => email.trim())
      .filter((email) => email.length > 0); // Remove empty strings

    if (emails.length > 0) {
      // Update the current field
      form.setValue(`emails.${index}.email`, emails[0]);

      // Add new fields for remaining emails
      emails.slice(1).forEach((email) => {
        append({ email });
      });
      // Scroll to bottom after adding all fields
      setTimeout(() => {
        if (formContainerRef.current) {
          formContainerRef.current.scrollTop = formContainerRef.current.scrollHeight;
        }
      }, 0);
    }
  };

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
          message: t('error.some_failed'),
        });
        return;
      }

      toast(t('success'));
      onSuccess();
    } catch {
      form.setError('root', {
        message: t('error.generic'),
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-h-[60vh] overflow-y-auto -m-3 p-3"
        ref={formContainerRef}
      >
        <p className="text-sm text-muted-foreground">
          {t('tip')}
        </p>
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
                    <FormLabel>{t('email.label')}</FormLabel>
                    <FormControl>
                      <div className="flex gap-2 items-center">
                        <Input
                          placeholder={t('email.placeholder')}
                          {...field}
                          onPaste={(e) => handlePaste(e, index)}
                        />
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            className="mb-2"
                            onClick={() => remove(index)}
                          >
                            {t('remove')}
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
            onClick={handleAppend}
          >
            <Plus className="h-4 w-4" />
            {t('add')}
          </Button>
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            {t('cancel')}
          </Button>
          <Button type="submit">{t('submit')}</Button>
        </div>
      </form>
    </Form>
  );
}
