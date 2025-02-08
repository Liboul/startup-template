import { betterFetch, type BetterFetchOption } from '@better-fetch/fetch';
import {
  SERVERLESS_FUNCTION_API_KEY_HEADER_NAME,
  getSecretApiKey,
} from './header';
import { Route } from 'next';

export function callServerlessFunction(
  url: Route,
  options: BetterFetchOption = {},
) {
  const headers = {
    [SERVERLESS_FUNCTION_API_KEY_HEADER_NAME]: getSecretApiKey(),
    ...options.headers,
  };
  console.log('Headers:', JSON.stringify(headers, null, 2));
  return betterFetch(url, {
    ...options,
    method: 'POST',
    headers,
  });
}
