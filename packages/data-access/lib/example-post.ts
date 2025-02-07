import { db } from '@startup-template/db';

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