'use client';

import { signinMagicLink } from '@/auth/client';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@repo/ui/components/alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { MailIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function MagicLinkLogin({ callbackURL }: { callbackURL?: string }) {
  const t = useTranslations('auth.magic_link');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const formSchema = z.object({
    email: z.string().email(t('email.invalid')),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setHasSubmitted(true);
    await signinMagicLink(values.email, callbackURL);
  }

  if (hasSubmitted) {
    return (
      <div className="space-y-4">
        <Alert>
          <MailIcon className="h-4 w-4" />
          <AlertTitle>{t('check_email.title', { email: form.getValues().email })}</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            {t('check_email.description')}
          </AlertDescription>
        </Alert>
        <div className="text-sm text-muted-foreground">
          {t('check_email.help')}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email.label')}</FormLabel>
                <div className="flex gap-2 items-center">
                  <FormControl className="flex gap-2 items-center">
                    <Input
                      autoFocus
                      placeholder={t('email.placeholder')}
                      {...field}
                    />
                  </FormControl>
                  <Button type="submit">{t('submit')}</Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
