// export async function GET(request: Request) {
//   return new Response('Hello, from API!');
// }

import { defineServerlessFunction } from '@repo/serverless-function';

export const POST = defineServerlessFunction(async () => {
  console.log('Hello, from serverless function!');
});
