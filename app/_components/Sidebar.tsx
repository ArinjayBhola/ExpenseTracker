"use client";

import { 
  BadgeIndianRupee, 
  HandCoinsIcon, 
  HomeIcon, 
  Zap, 
  CreditCard, 
  Users, 
  User,
  LucideIcon
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: number;
  name: string;
  icon: LucideIcon;
  path: string;
}

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const sidebarItems: NavItem[] = [
    { id: 1, name: "Dashboard", icon: HomeIcon, path: "/dashboard" },
    { id: 2, name: "Insights", icon: Zap, path: "/insights" },
    { id: 3, name: "Transaction", icon: HandCoinsIcon, path: "/mytransaction" },
    { id: 4, name: "Workspaces", icon: Users, path: "/workspaces" },
    { id: 5, name: "Billing", icon: CreditCard, path: "/billing" },
    { id: 6, name: "Settings", icon: User, path: "/settings" },
  ];

  return (
    <div className="h-full w-full p-4">
      <div className="h-full glass-panel rounded-3xl flex flex-col overflow-hidden">
        {/* Logo Section */}
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <BadgeIndianRupee className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold bg-linear-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            Finance
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 space-y-2">
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold px-4 mb-4">
            Main Menu
          </div>
          {sidebarItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={cn(
                  "w-full group flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300",
                  isActive 
                    ? "bg-primary/10 text-primary shadow-sm" 
                    : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                )}
              >
                <Icon 
                  size={20} 
                  className={cn(
                    "transition-transform duration-300 group-hover:scale-110",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                  )} 
                />
                <span className="font-medium text-sm">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer info or upgrade card */}
        <div className="p-4">
          <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
            <p className="text-xs text-muted-foreground mb-2">Current Plan</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Pro Plan</span>
              <Zap size={14} className="text-accent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
