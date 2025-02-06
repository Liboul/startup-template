import { redirect } from 'next/navigation';

export const GET = () => {
  return redirect('/org/dashboard');
};
