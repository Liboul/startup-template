import { exampleFunctionFromLib } from '@startup-template/example-lib';
import { db } from '@startup-template/db';
import { createCaller, createTRPCContext } from '@startup-template/api';

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

async function main() {
  await testFunctionFromLib();
  await testDbCall();
  await testTrpcCalls();
}

main();
