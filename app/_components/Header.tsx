"use client";

import { useSession, signOut } from "next-auth/react";
import { Bell, LogOut, Search, User as UserIcon, Settings as SettingsIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex justify-between items-center p-8">
      {/* Search Bar or Breadcrumb Area */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="w-full bg-secondary border border-border/50 rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2.5 rounded-xl bg-secondary hover:bg-muted text-muted-foreground hover:text-foreground transition-all">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-background" />
        </button>
        
        {status === "loading" ? (
          <div className="h-12 w-12 rounded-2xl bg-secondary animate-pulse" />
        ) : session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-12 w-12 rounded-2xl overflow-hidden hover:opacity-80 transition-opacity p-0 border border-border/50">
                <div className="w-full h-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-primary" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 glass-panel rounded-2xl border-white/60 text-foreground mt-2 p-2" align="end">
              <DropdownMenuLabel className="font-normal p-4">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold leading-none">{session.user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/50 mx-2" />
              <DropdownMenuItem className="cursor-pointer rounded-xl p-3 hover:bg-primary/5 focus:bg-primary/5 transition-colors gap-3">
                <UserIcon size={16} className="text-muted-foreground" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer rounded-xl p-3 hover:bg-primary/5 focus:bg-primary/5 transition-colors gap-3">
                <SettingsIcon size={16} className="text-muted-foreground" />
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/50 mx-2" />
              <DropdownMenuItem 
                className="cursor-pointer rounded-xl p-3 text-red-400 hover:bg-red-400/10 focus:bg-red-400/10 transition-colors gap-3"
                onClick={() => signOut({ callbackUrl: "/signin" })}
              >
                <LogOut size={16} />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button 
            className="premium-gradient text-white rounded-2xl px-6 h-11 border-none shadow-lg shadow-primary/20"
            onClick={() => window.location.href = "/signin"}
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
