import { exampleFunctionFromLib } from '@startup-template/example-lib';
import { prisma } from '@startup-template/db';
async function testFunctionFromLib() {
  console.log(exampleFunctionFromLib());
}

async function testDbCall() {
  const posts = await prisma.examplePost.findMany();
  console.log(`posts: ${JSON.stringify(posts, null, 2)}`);
}

async function main() {
  await testFunctionFromLib();
  await testDbCall();
}

main();
