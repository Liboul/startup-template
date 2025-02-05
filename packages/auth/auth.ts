import { db } from '@startup-template/db';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { organization } from 'better-auth/plugins';
import { magicLink } from 'better-auth/plugins';
import { sendEmail } from '@startup-template/email';

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error('GOOGLE_CLIENT_ID is not set');
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('GOOGLE_CLIENT_SECRET is not set');
}

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: false,
  },
  plugins: [
    organization(),
    nextCookies(),
    magicLink({
      sendMagicLink: (data) => {
        sendEmail({
          To: data.email,
          Subject: 'Sign into Startup Template',
          HtmlBody: `<a href="${data.url}">Click here to login</a>`,
        });
      },
    }),
  ],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});
