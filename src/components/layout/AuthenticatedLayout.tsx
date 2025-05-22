
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LogOut, 
  Home, 
  User, 
  Users, 
  Settings, 
  Bell,
  Menu, 
  X,
  LayoutDashboard 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  const { user, userRole, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const userInitials = profile ? 
    `${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}`.toUpperCase() : 
    user?.email?.charAt(0).toUpperCase() || "U";
    
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const handleSignOut = async () => {
    await signOut();
  };
  
  const navigateTo = (path: string) => {
    navigate(path);
  };

  // Role-specific navigation items
  const getNavItems = () => {
    const commonItems = [
      { 
        label: 'Dashboard', 
        icon: <LayoutDashboard className="h-5 w-5" />, 
        action: () => navigateTo(getRoleDashboardPath())
      }
    ];
    
    const roleSpecificItems = {
      patient: [
        { 
          label: 'Riwayat Obat', 
          icon: <Bell className="h-5 w-5" />, 
          action: () => navigateTo('/patient-medication-history') 
        }
      ],
      nurse: [
        { 
          label: 'Pasien Saya', 
          icon: <User className="h-5 w-5" />, 
          action: () => navigateTo('/nurse-patients') 
        },
        {
          label: 'Resep Obat',
          icon: <Bell className="h-5 w-5" />,
          action: () => navigateTo('/nurse-prescriptions')
        }
      ],
      admin: [
        { 
          label: 'Pengguna', 
          icon: <Users className="h-5 w-5" />, 
          action: () => navigateTo('/admin-dashboard?tab=users') 
        },
        { 
          label: 'Obat', 
          icon: <Bell className="h-5 w-5" />, 
          action: () => navigateTo('/admin-medicines') 
        },
        { 
          label: 'Pengaturan', 
          icon: <Settings className="h-5 w-5" />, 
          action: () => navigateTo('/admin-dashboard?tab=settings') 
        }
      ]
    };
    
    return [...commonItems, ...(roleSpecificItems[userRole as keyof typeof roleSpecificItems] || [])];
  };

  // Get current role's dashboard path
  const getRoleDashboardPath = () => {
    switch (userRole) {
      case "patient":
        return "/patient-dashboard";
      case "nurse":
        return "/nurse-dashboard";
      case "admin":
        return "/admin-dashboard";
      default:
        return "/login";
    }
  };
  
  // Get role label
  const getRoleLabel = () => {
    switch (userRole) {
      case "patient":
        return "Pasien";
      case "nurse":
        return "Perawat";
      case "admin":
        return "Admin";
      default:
        return "Pengguna";
    }
  };
  
  const navItems = getNavItems();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white border-r transition-all duration-300 flex flex-col",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Sidebar header with logo */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className={cn("flex items-center", sidebarOpen ? "justify-start" : "justify-center w-full")}>
            <div className="h-8 w-8 rounded-full bg-imo-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">IMO</span>
            </div>
            {sidebarOpen && (
              <span className="ml-2 font-semibold text-lg">MANTAP</span>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className={cn(!sidebarOpen && "hidden")}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
        
        {/* User profile section */}
        <div className={cn(
          "border-b p-4 flex items-center",
          sidebarOpen ? "justify-start" : "justify-center"
        )}>
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-imo-primary text-white">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          {sidebarOpen && (
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium truncate">
                {profile ? `${profile.first_name} ${profile.last_name}` : user?.email}
              </p>
              <p className="text-xs text-gray-500">
                {getRoleLabel()}
              </p>
            </div>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    sidebarOpen ? "px-3" : "px-2 justify-center"
                  )}
                  onClick={item.action}
                >
                  {item.icon}
                  {sidebarOpen && <span className="ml-3">{item.label}</span>}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Sidebar footer */}
        <div className="border-t p-4">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50",
              sidebarOpen ? "px-3" : "px-2 justify-center"
            )}
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Keluar</span>}
          </Button>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 bg-gray-50">
        {/* Collapsed sidebar toggle (mobile) */}
        <div className="lg:hidden bg-white p-4 border-b flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu size={20} />
          </Button>
          <div className="ml-3">
            <h2 className="font-bold">IMO MANTAP</h2>
          </div>
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarFallback className="bg-imo-primary text-white">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigateTo(getRoleDashboardPath())}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Page content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
