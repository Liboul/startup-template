import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@repo/ui/components/card';
import { Button } from '@repo/ui/components/button';
import { AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function InvitationError() {
  const t = useTranslations('organization.accept_invitation.error_page');

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-6 h-6 text-destructive" />
          <CardTitle className="text-xl text-destructive">
            {t('title')}
          </CardTitle>
        </div>
        <CardDescription>
          {t('description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          {t('message')}
        </p>
      </CardContent>
      <CardFooter>
        <Link href="/" className="w-full">
          <Button variant="outline" className="w-full">
            {t('back_home')}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
