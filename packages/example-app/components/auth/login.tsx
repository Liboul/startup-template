'use client';

import {
  Card,
  CardContent,
  CardHeader,
} from '@startup-template/ui/components/card';
import { Separator } from '@startup-template/ui/components/separator';
import { CommandIcon } from 'lucide-react';
import { GoogleLogin } from './google-login';
import { MagicLinkLogin } from './magic-link-login';

export default function Login() {
  return (
    <div className="relative flex flex-col min-h-[100dvh] items-center justify-center gap-4 p-8">
      <div className="flex justify-center">
        <div className="flex items-center justify-center rounded-lg bg-black h-13 w-13">
          <CommandIcon className="h-4 w-4 shrink-0 text-white" />
        </div>
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
            <GoogleLogin />

            <div className="relative">
              <div className="flex items-center gap-4">
                <Separator className="flex-1" />
                <span className="text-sm text-muted-foreground">OR</span>
                <Separator className="flex-1" />
              </div>
            </div>

            <MagicLinkLogin />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
