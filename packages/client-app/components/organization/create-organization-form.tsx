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
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export interface CreateOrganizationFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateOrganizationForm({
  onSuccess,
  onCancel,
}: CreateOrganizationFormProps) {
  const t = useTranslations('organization.create.form');
  
  const createOrgSchema = z.object({
    name: z.string().min(1, t('name.required')),
    slug: z
      .string()
      .min(1, t('slug.required'))
      .regex(
        /^[a-z0-9-]+$/,
        t('slug.format'),
      ),
  });

  type CreateOrgFormData = z.infer<typeof createOrgSchema>;

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
              <FormLabel>{t('name.label')}</FormLabel>
              <FormControl>
                <Input placeholder={t('name.placeholder')} {...field} />
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
              <FormLabel>{t('slug.label')}</FormLabel>
              <FormControl>
                <Input placeholder={t('slug.placeholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              {t('cancel')}
            </Button>
          )}
          <Button type="submit">{t('submit')}</Button>
        </div>
      </form>
    </Form>
  );
}
