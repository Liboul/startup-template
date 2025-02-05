'use client';

import {
  Card,
  CardContent,
  CardHeader,
} from '@startup-template/ui/components/card';
import { SeparatorWithContent } from '@startup-template/ui/components/separator-with-content';
import { Logo } from '@/components/logo';
import { GoogleLogin } from './google-login';
import { MagicLinkLogin } from './magic-link-login';
import { useSearchParams } from 'next/navigation';

export default function Login() {
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get('callbackURL') || undefined;
  return (
    <div className="relative flex flex-col min-h-[100dvh] items-center justify-center gap-4 p-8">
      <div className="flex justify-center">
        <Logo />
      </div>

      <Card className="z-10 mx-auto w-full max-w-[500px]">
        <CardHeader>
          <h1 className="text-3xl font-semibold">
            Welcome to Startup Template
          </h1>
          <p className="text-muted-foreground">
            Connect with Google or your work email
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <GoogleLogin callbackURL={callbackURL} />
            <SeparatorWithContent>OR</SeparatorWithContent>
            <MagicLinkLogin callbackURL={callbackURL} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
