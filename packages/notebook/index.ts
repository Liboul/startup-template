import { exampleFunctionFromLib } from '@startup-template/example-lib';
import { db } from '@startup-template/db';
import { createCaller, createTRPCContext } from '@startup-template/api';
import { callServerlessFunction } from '@startup-template/serverless-function';
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

async function testServerlessFunction() {
  console.log(
    'Make sure to run nx dev example-app to test serverless function',
  );
  const response = await callServerlessFunction(
    'http://localhost:3000/api/example-serverless-function',
  );
  console.log(`Serverless function: ${JSON.stringify(response, null, 2)}`);
  console.log('Check out the server logs to make sure the function was called');
}

async function main() {
  await testFunctionFromLib();
  await testDbCall();
  await testTrpcCalls();
  await testServerlessFunction();
}

main();
