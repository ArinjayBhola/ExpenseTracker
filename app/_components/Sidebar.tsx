"use client";

import { 
  BadgeIndianRupee, 
  HandCoinsIcon, 
  HomeIcon, 
  Zap, 
  CreditCard, 
  Users, 
  User,
  LucideIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavItem {
  id: number;
  name: string;
  icon: LucideIcon;
  path: string;
}

const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarItems: NavItem[] = [
    { id: 1, name: "Dashboard", icon: HomeIcon, path: "/dashboard" },
    { id: 2, name: "Insights", icon: Zap, path: "/insights" },
    { id: 3, name: "Transaction", icon: HandCoinsIcon, path: "/mytransaction" },
    { id: 4, name: "Workspaces", icon: Users, path: "/workspaces" },
    { id: 5, name: "Billing", icon: CreditCard, path: "/billing" },
    { id: 6, name: "Settings", icon: User, path: "/settings" },
  ];

  return (
    <div 
      className={cn(
        "h-full relative transition-[width] duration-300 ease-in-out flex flex-col bg-card border-r border-border overflow-visible",
        isCollapsed ? "w-[72px]" : "w-64" 
      )}
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute right-4 translate-x-1/2 top-6 z-100 bg-card border border-border shadow-md rounded-full p-1.5 text-muted-foreground hover:text-primary transition-colors flex items-center justify-center outline-none ring-0"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo Section */}
      <div className={cn("flex items-center gap-3 h-16 border-b border-border/50 transition-all duration-300", isCollapsed ? "justify-center px-0" : "px-6")}>
        <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center shrink-0">
          <BadgeIndianRupee className="text-white" size={20} />
        </div>
        <span className={cn(
          "text-lg font-bold text-foreground whitespace-nowrap overflow-hidden transition-all duration-300",
          isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
        )}>
          Finance Tracker
        </span>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        <div className={cn(
          "text-xs uppercase tracking-wider text-muted-foreground font-semibold px-3 mb-2 transition-opacity duration-300",
          isCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
        )}>
          Menu
        </div>
        
        {sidebarItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link 
              href={item.path}
              key={item.id}
              className={cn(
                  "group flex items-center rounded-md transition-all duration-200",
                  isCollapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5",
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon 
                size={20} 
                className={cn(
                  "shrink-0",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )} 
              />
              <span className={cn(
                "text-sm whitespace-nowrap overflow-hidden transition-all duration-300",
                isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-border/50">
         <div className={cn(
            "flex items-center gap-3 transition-opacity duration-300",
            isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
         )}>
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
               <User size={16} />
            </div>
            <div className="flex-1 overflow-hidden">
               <p className="text-xs font-medium text-foreground truncate">Enterprise Plan</p>
               <p className="text-[10px] text-muted-foreground truncate">Visa Corp.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Sidebar;

