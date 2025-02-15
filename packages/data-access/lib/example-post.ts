import { db } from '@repo/db';

export async function createExamplePost(title: string) {
  return db.examplePost.create({
    data: {
      title,
    },
  });
}

export async function findManyExamplePosts() {
  return db.examplePost.findMany({
    orderBy: { createdAt: 'desc' },
  });
}
