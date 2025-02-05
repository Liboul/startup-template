import { organizationClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { magicLinkClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  plugins: [organizationClient(), magicLinkClient()],
});

const callbackURL = '/dashboard';

export const signinGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: 'google',
    callbackURL,
  });
  return data;
};

export const signinMagicLink = async (email: string) => {
  return await authClient.signIn.magicLink({
    email,
    callbackURL,
  });
};
