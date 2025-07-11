import { createCaller, createTRPCContext } from '@repo/api';
import { db } from '@repo/db';
import { search } from '@repo/search';
import { exampleFunctionFromLib } from '@repo/example-lib';
import { redis } from '@repo/redis';
import { callServerlessFunction } from '@repo/serverless-function';

async function testFunctionFromLib() {
  console.log(exampleFunctionFromLib());
}

async function testDbCall() {
  const posts = await db.examplePost.findMany();
  console.log(`DB: posts: ${JSON.stringify(posts, null, 2)}`);
}

async function testTrpcCalls() {
  // Create tRPC caller
  const context = await createTRPCContext({
    headers: new Headers(),
  });
  const caller = createCaller(context);

  const helloResult = await caller.examplePost.hello({ text: 'From TRPC' });
  console.log(`tRPC: Hello result: ${JSON.stringify(helloResult, null, 2)}`);

  const createResult = await caller.examplePost.create({ title: 'Test Post' });
  console.log(
    `tRPC: Create examplePost: ${JSON.stringify(createResult, null, 2)}`,
  );

  const getAllResult = await caller.examplePost.getAll();
  console.log(
    `tRPC: GetAll examplePost: ${JSON.stringify(getAllResult, null, 2)}`,
  );
}

async function testRedis() {
  console.log('Testing Redis operations...');

  // Test setting a value
  await redis.set('test-key', 'Hello from Redis!');
  console.log('Set value in Redis');

  // Test getting a value
  const value = await redis.get('test-key');
  console.log(`Retrieved value from Redis: ${value}`);

  // Clean up
  await redis.del('test-key');
  console.log('Cleaned up test key');
}

async function testServerlessFunction() {
  console.log('Testing Serverless Function...');

  console.log('Publishing immediate message...');
  const immediateResult = await callServerlessFunction(
    'api/example-serverless-function',
    {
      message: 'Hello from the notebook!',
    },
  );
  console.log('Message published:', immediateResult);
  console.log('Waiting for message to be processed...');
  // Wait for the message to be processed
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('Message should have been processed, check the server logs!');
}

async function testSearch() {
  console.log('Testing Search...');
  const stats = await search.indices.stats();
  console.log('Search stats:', stats);
}

async function main() {
  await testFunctionFromLib();
  await testDbCall();
  await testTrpcCalls();
  await testServerlessFunction();
  await testRedis();
  await testSearch();
}

main();
