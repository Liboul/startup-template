import { AppSidebar } from '@/components/navigation/app-sidebar';
import { SidebarProvider } from '@startup-template/ui/components/sidebar';

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default async function AppLayout({ children }: AccountLayoutProps) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </SidebarProvider>
  );
}
