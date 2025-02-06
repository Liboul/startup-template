import { OrganizationSwitcher } from '@/components/organization/organization-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from '@startup-template/ui/components/sidebar';
import { NavUser } from './nav-user';
import { NavigationItems } from './navigation-items';

interface AccountSidebarProps {
  userEmail: string;
  userImage: string | null;
}

export function AccountSidebar({ userEmail, userImage }: AccountSidebarProps) {
  return (
    <Sidebar collapsible="none">
      <SidebarHeader>
        <OrganizationSwitcher organizations={[]} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <NavigationItems />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ avatar: userImage, email: userEmail }} />
      </SidebarFooter>
    </Sidebar>
  );
}
