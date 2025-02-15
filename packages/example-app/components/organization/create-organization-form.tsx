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
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const createOrgSchema = z.object({
  name: z.string().min(1, 'Organization name is required'),
  slug: z
    .string()
    .min(1, 'Organization identifier is required')
    .regex(
      /^[a-z0-9-]+$/,
      'Only lowercase letters, numbers, and hyphens are allowed',
    ),
});

export type CreateOrgFormData = z.infer<typeof createOrgSchema>;

export interface CreateOrganizationFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateOrganizationForm({
  onSuccess,
  onCancel,
}: CreateOrganizationFormProps) {
  const router = useRouter();
  const form = useForm<CreateOrgFormData>({
    resolver: zodResolver(createOrgSchema),
    defaultValues: {
      name: '',
      slug: '',
    },
  });

  async function onSubmit(data: CreateOrgFormData) {
    const { data: organization, error } = await authClient.organization.create({
      name: data.name,
      slug: data.slug,
    });

    // Slug must be unique
    if (error) {
      form.setError('slug', { message: error.message });
      return;
    }

    await authClient.organization.setActive({
      organizationId: organization.id,
    });
    onSuccess?.();
    router.push('/org/members');
    router.refresh();
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization identifier</FormLabel>
              <FormControl>
                <Input placeholder="acme" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Form>
  );
}
