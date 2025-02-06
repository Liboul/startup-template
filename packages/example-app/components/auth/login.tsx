import {
  Card,
  CardContent,
  CardHeader,
} from '@startup-template/ui/components/card';
import { SeparatorWithContent } from '@startup-template/ui/components/separator-with-content';
import { GoogleLogin } from './google-login';
import { MagicLinkLogin } from './magic-link-login';

export default function Login({ callbackURL }: { callbackURL?: string }) {
  return (
    <Card className="z-10 mx-auto w-full">
      <CardHeader>
        <h1 className="text-3xl font-semibold">Welcome to Startup Template</h1>
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
  );
}
