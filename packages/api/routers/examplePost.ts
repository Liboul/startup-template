import { z } from 'zod';
import {
  createExamplePost,
  findManyExamplePosts,
} from '@repo/data-access/example-post';
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
    .mutation(async ({ input }) => {
      return createExamplePost(input.title);
    }),

  getAll: publicProcedure.query(async () => {
    const posts = await findManyExamplePosts();
    return posts ?? null;
  }),
});
