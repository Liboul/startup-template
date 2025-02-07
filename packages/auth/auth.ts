import { db } from '@startup-template/db';
import { findFirstOrganizationByUserId } from '@startup-template/data-access/organization';
import { sendEmail } from '@startup-template/email';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { magicLink, organization } from 'better-auth/plugins';

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
    organization({
      async sendInvitationEmail(data) {
        const inviteLink = `${process.env.BETTER_AUTH_URL}/accept-invitation/${data.id}`;
        await sendEmail({
          To: data.email,
          Subject: `You have been invited to join ${data.organization.name} on Startup Template`,
          HtmlBody: `<p>You have been invited by <b>${data.inviter.user.email}</b> to join <b>${data.organization.name}</b> on <b>Startup Template</b>.</p><p>Click <a href="${inviteLink}">here</a> to accept the invitation.</p>`,
        });
      },
    }),
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
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const organization = await findFirstOrganizationByUserId(
            session.userId,
          );
          return {
            data: {
              ...session,
              activeOrganizationId: organization?.id,
            },
          };
        },
      },
    },
  },
});
