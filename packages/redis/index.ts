import { Redis } from '@upstash/redis';

// Validate required environment variables
const KV_REST_API_URL = process.env.KV_REST_API_URL;
const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN;

if (!KV_REST_API_URL) {
  throw new Error('KV_REST_API_URL environment variable is required');
}
if (!KV_REST_API_TOKEN) {
  throw new Error('KV_REST_API_TOKEN environment variable is required');
}

export const redis = new Redis({
  url: KV_REST_API_URL,
  token: KV_REST_API_TOKEN,
});
