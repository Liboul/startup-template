import { verifySignatureAppRouter } from '@upstash/qstash/nextjs';

async function handler(request: Request) {
  const data = await request.json();
  console.log('QStash message received:', data);
  return new Response('ok');
}

export const POST = verifySignatureAppRouter(handler);
