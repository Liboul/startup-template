import { Client } from '@opensearch-project/opensearch';
import { AwsSigv4Signer } from '@opensearch-project/opensearch/aws';

if (!process.env.OPENSEARCH_NODE) {
  throw new Error('OPENSEARCH_NODE environment variable is not set');
}

if (!process.env.OPENSEARCH_REGION) {
  throw new Error('OPENSEARCH_REGION environment variable is not set');
}

const search = new Client({
  ...AwsSigv4Signer({
    region: process.env.OPENSEARCH_REGION,
    service: 'aoss',
    getCredentials: () =>
      new Promise((resolve) => {
        if (!process.env.OPENSEARCH_ACCESS_KEY_ID) {
          throw new Error(
            'OPENSEARCH_ACCESS_KEY_ID environment variable is not set',
          );
        }
        if (!process.env.OPENSEARCH_SECRET_ACCESS_KEY) {
          throw new Error(
            'OPENSEARCH_SECRET_ACCESS_KEY environment variable is not set',
          );
        }
        return resolve({
          accessKeyId: process.env.OPENSEARCH_ACCESS_KEY_ID,
          secretAccessKey: process.env.OPENSEARCH_SECRET_ACCESS_KEY,
        });
      }),
  }),
  node: process.env.OPENSEARCH_NODE,
});

export { search };
