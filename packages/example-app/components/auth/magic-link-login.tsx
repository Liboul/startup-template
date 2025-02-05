'use client';

import { signinMagicLink } from '@/auth/client';
import { Button } from '@startup-template/ui/components/button';
import { Input } from '@startup-template/ui/components/input';
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

const formSchema = z.object({
  email: z.string().email('Email is not valid'),
});

export function MagicLinkLogin() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setHasSubmitted(true);
    await signinMagicLink(values.email);
  }

  if (hasSubmitted) {
    return <div>A magic link has been sent to {form.getValues().email}</div>;
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