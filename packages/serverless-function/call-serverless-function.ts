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

  return betterFetch(`${getBaseUrl()}${url}`, {
    ...options,
    method: 'POST',
    headers,
  });
}

const getBaseUrl = () => {
  if (!process.env.BASE_URL) {
    throw new Error('BASE_URL is not set');
  }
  return process.env.BASE_URL;
};
