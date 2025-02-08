import { examplePostRouter } from './routers/examplePost';
import { organizationRouter } from './routers/organization';
import { createCallerFactory, createTRPCRouter } from './trpc';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  examplePost: examplePostRouter,
  organization: organizationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInput['example']['hello']
 **/
export type RouterInput = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutput['example']['hello']
 **/
export type RouterOutput = inferRouterOutputs<AppRouter>;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
