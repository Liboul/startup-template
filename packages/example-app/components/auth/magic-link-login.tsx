'use client';

import { signinMagicLink } from '@/auth/client';
import { Button } from '@startup-template/ui/components/button';
import { Input } from '@startup-template/ui/components/input';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@startup-template/ui/components/alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@startup-template/ui/components/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { MailIcon } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email('Email is not valid'),
});

export function MagicLinkLogin({ callbackURL }: { callbackURL?: string }) {
  const [hasSubmitted, setHasSubmitted] = useState(false);
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
          <AlertTitle>Check your email ({form.getValues().email})</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            {
              "We've sent an authentication link to your email address. Click the link to sign in to your account."
            }
          </AlertDescription>
        </Alert>
        <div className="text-sm text-muted-foreground">
          {"Didn't receive the email? Check your spam folder or try again"}
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
                <FormLabel>Enter your work email</FormLabel>
                <div className="flex gap-2 items-center">
                  <FormControl className="flex gap-2 items-center">
                    <Input
                      autoFocus
                      placeholder="Your email goes here"
                      {...field}
                    />
                  </FormControl>
                  <Button type="submit">Submit</Button>
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
