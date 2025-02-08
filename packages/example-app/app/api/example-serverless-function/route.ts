// export async function GET(request: Request) {
//   return new Response('Hello, from API!');
// }

import { defineServerlessFunction } from '@startup-template/serverless-function';

export const POST = defineServerlessFunction(async () => {
  console.log('Hello, from serverless function!');
});
