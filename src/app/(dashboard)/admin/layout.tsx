"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Warehouse, 
  Settings, 
  Users,
  BarChart2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

function AdminSidebar() {
  const { open } = useSidebar();
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Productos",
      href: "/admin/products",
      icon: Package,
    },
    {
      title: "Inventario",
      href: "/admin/inventory",
      icon: Warehouse,
    },
    {
      title: "Usuarios",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Reportes",
      href: "/admin/reports",
      icon: BarChart2,
    },
    {
      title: "Configuración",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <aside
      className={cn(
        "flex flex-col border-r bg-background transition-all duration-300 fixed left-0 top-0 bottom-0",
        !open ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center border-b px-4">
        <SidebarTrigger className="h-8 w-8" />
        {open && (
          <span className="ml-2 text-lg font-semibold">Admin Panel</span>
        )}
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid gap-1 p-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {open && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}

function AdminContent({ children, isLoading }: { children: React.ReactNode; isLoading?: boolean }) {
  const { open } = useSidebar();
  
  if (isLoading) {
    return (
      <main className={cn(
        "flex-1 transition-all duration-300",
        open ? "ml-64" : "ml-16"
      )}>
        <div className="container mx-auto p-6 max-w-7xl">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Skeleton className="h-8 w-[200px]" />
              <Skeleton className="h-10 w-[100px]" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-[120px] rounded-lg" />
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => (
                <Skeleton key={i} className="h-[300px] rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }
  
  return (
    <main className={cn(
      "flex-1 transition-all duration-300",
      open ? "ml-64" : "ml-16"
    )}>
      <div className="container mx-auto p-6 max-w-7xl">
        {children}
      </div>
    </main>
  );
}

export default function AdminLayout({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading?: boolean;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <AdminContent isLoading={isLoading}>{children}</AdminContent>
      </div>
    </SidebarProvider>
  );
} 