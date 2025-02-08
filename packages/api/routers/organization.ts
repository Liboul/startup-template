import { TRPCError } from '@trpc/server';
import { findOrganizationById } from '@startup-template/data-access/organization';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const organizationRouter = createTRPCRouter({
  getActive: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.session.activeOrganizationId) {
      return null;
    }

    const organization = await findOrganizationById(ctx.session.session.activeOrganizationId);

    if (!organization) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Active organization not found',
      });
    }

    return organization;
  }),
});
