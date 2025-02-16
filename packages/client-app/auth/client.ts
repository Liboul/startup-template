import { organizationClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { magicLinkClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  plugins: [organizationClient(), magicLinkClient()],
});

const defaultCallbackURL = '/org';

export const signinGoogle = async (callbackURL?: string) => {
  const data = await authClient.signIn.social({
    provider: 'google',
    callbackURL: callbackURL || defaultCallbackURL,
  });
  return data;
};

export const signinMagicLink = async (email: string, callbackURL?: string) => {
  return await authClient.signIn.magicLink({
    email,
    callbackURL: callbackURL || defaultCallbackURL,
  });
};
