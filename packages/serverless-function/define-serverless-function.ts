import { waitUntil } from '@vercel/functions';
import {
  getSecretApiKey,
  SERVERLESS_FUNCTION_API_KEY_HEADER_NAME,
} from './header';

export interface Options {
  skipAuthentication?: boolean;
}

// Usage:
// export const POST = defineServerlessFunction(async (request) => {
//   // Do something
// }, { skipAuthentication: false });

export function defineServerlessFunction(
  backgroundHandler: (request: Request) => Promise<void>,
  options: Options = { skipAuthentication: false },
) {
  return function POST(request: Request) {
    if (!options.skipAuthentication && !passesAuthentication(request)) {
      return new Response('Unauthorized', { status: 401 });
    }

    waitUntil(backgroundHandler(request));

    return new Response('ok');
  };
}

function passesAuthentication(request: NextRequest): boolean {
  const apiKey = request.headers.get(SERVERLESS_FUNCTION_API_KEY_HEADER_NAME);
  return apiKey === getSecretApiKey();
}
