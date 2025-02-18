'use client';

import { authClient } from '@/auth/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardFooter } from '@repo/ui/components/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface OrganizationSettingsFormProps {
  organization: {
    id: string;
    name: string;
    slug: string | null;
  };
}

export function OrganizationSettingsForm({
  organization,
}: OrganizationSettingsFormProps) {
  const t = useTranslations('organization.settings.form');
  
  const updateOrgSchema = z.object({
    name: z.string().min(1, t('name.required')),
    slug: z
      .string()
      .min(1, t('slug.required'))
      .regex(
        /^[a-z0-9-]+$/,
        t('slug.format'),
      ),
  });

  type UpdateOrgFormData = z.infer<typeof updateOrgSchema>;

  const form = useForm<UpdateOrgFormData>({
    resolver: zodResolver(updateOrgSchema),
    defaultValues: {
      name: organization.name,
      slug: organization.slug || '',
    },
  });

  const router = useRouter();

  async function onSubmit(data: UpdateOrgFormData) {
    try {
      const { error } = await authClient.organization.update({
        organizationId: organization.id,
        data: {
          name: data.name,
          slug: data.slug,
        },
      });

      // Slug must be unique
      if (error) {
        // For some reason there is a 500 when the slug is already in use, so we can't use the error message
        form.setError('slug', { message: t('slug.taken') });
        return;
      }

      toast.success(t('success'));
      router.refresh();
    } catch {
      toast.error(t('error'));
    }
  }

  return (
    <Card className="min-w-[400px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pt-6">
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
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit" size="lg" className="min-w-[160px]">
              {t('submit')}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
