import { getSession } from '@/auth/get-session';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (session?.user) {
    return redirect('/');
  }

  return <div className="">{children}</div>;
}
