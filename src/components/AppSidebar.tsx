import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileCode,
  Video,
  Crown,
  User,
  LogOut,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import axios from "axios";
import { toast } from "sonner";
import useUserStore from '../store/store';

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Coding Sheet", url: "/dashboard/coding-sheet", icon: FileCode },
  { title: "Start Interview", url: "/dashboard/start-interview", icon: Video },
  { title: "Groups", url: "/dashboard/groups", icon: Users },
  { title: "Go Premium", url: "/dashboard/premium", icon: Crown },
  { title: "Account", url: "/dashboard/account", icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const navigate = useNavigate();
    const { user, removeUser } = useUserStore();

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/logout`, 
        { withCredentials: true }
      );
      
      if (res.status === 200) {
        removeUser();
        toast.success('Logged out successfully');
        navigate('/');
      }
    } catch (error) {
      toast.error('Failed to logout. Please try again.');
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "justify-center" : ""}>
            {!isCollapsed && "Menu"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        isActive 
                          ? "gradient-heading font-semibold bg-muted/50" 
                          : "hover:bg-muted/30 transition-all"
                      }
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              {/* Logout Button */}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} tooltip="Log Out">
                  <LogOut />
                  <span>Log Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
