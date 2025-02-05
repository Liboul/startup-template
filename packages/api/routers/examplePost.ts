import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const examplePostRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.examplePost.create({
        data: {
          title: input.title,
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.examplePost.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return post ?? null;
  }),
});
