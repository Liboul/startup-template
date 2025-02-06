import { getSessionOrThrow } from '@/auth/get-session';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@startup-template/ui/components/sidebar';
import { NavUser } from './nav-user';
import { OrganizationSidebarGroup } from './organization-sidebar-group';
import { OrganizationSwitcher } from './organization-switcher';
import { AccountSidebarGroup } from './account-sidebar-group';

export async function AppSidebar() {
  const { user } = await getSessionOrThrow();
  return (
    <Sidebar collapsible="none">
      <SidebarHeader>
        <OrganizationSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <OrganizationSidebarGroup />
        <AccountSidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ avatar: user.image, email: user.email }} />
      </SidebarFooter>
    </Sidebar>
  );
}
