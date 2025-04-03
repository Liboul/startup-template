import { client as qstash } from './client';

if (!process.env.BASE_URL) {
  throw new Error('BASE_URL is not set');
}

const QSTASH_BASE_URL = process.env.BASE_URL.startsWith('http://localhost')
  ? process.env.BASE_URL.replace(
      'http://localhost',
      'http://host.docker.internal',
    )
  : process.env.BASE_URL;

export function publishMessage(path: string, message: unknown) {
  return qstash.publishJSON({
    url: `${QSTASH_BASE_URL}/${path}`,
    body: message,
  });
}
