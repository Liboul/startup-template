export const SERVERLESS_FUNCTION_API_KEY_HEADER_NAME = 'X-API-KEY';

export const getSecretApiKey = () => {
  if (!process.env.SERVERLESS_FUNCTION_API_KEY) {
    throw new Error('SERVERLESS_FUNCTION_API_KEY is not set');
  }
  return process.env.SERVERLESS_FUNCTION_API_KEY;
};
