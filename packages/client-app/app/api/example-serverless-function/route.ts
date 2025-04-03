import { verifySignatureAppRouter } from '@upstash/qstash/nextjs';

export const POST = verifySignatureAppRouter(async (request: Request) => {
  const data = await request.json();
  console.log('Executing serverless function:', data);
  return new Response('ok');
});
