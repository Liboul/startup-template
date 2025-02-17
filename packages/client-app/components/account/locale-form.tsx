'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { LocaleSwitcher } from '@/components/navigation/locale-switcher';

export function LocaleForm() {
  return (
    <Card className="min-w-[400px]">
      <CardHeader>
        <CardTitle>Language Preferences</CardTitle>
        <CardDescription>
          Choose your preferred language for the interface.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LocaleSwitcher />
      </CardContent>
    </Card>
  );
}
