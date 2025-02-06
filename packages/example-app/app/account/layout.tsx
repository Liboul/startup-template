import { getSession } from '@/auth/get-session';
import { AccountSidebar } from '@/components/account/sidebar';
import { SidebarProvider } from '@startup-template/ui/components/sidebar';

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default async function AccountLayout({ children }: AccountLayoutProps) {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');
  const user = session.user;

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen">
        <AccountSidebar userEmail={user.email} userImage={user.image || null} />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </SidebarProvider>
  );
}
