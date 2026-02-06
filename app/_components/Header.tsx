"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut, User as UserIcon, Settings as SettingsIcon, Bell } from "lucide-react";
import Link from "next/link";
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

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className="flex justify-between items-center px-8 h-16 sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      {/* Breadcrumbs or Page Title could go here */}
      <div className="flex-1" />
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Bell size={20} />
        </Button>
        
        <div className="w-px h-6 bg-border mx-2" />

        {status === "loading" ? (
          <div className="h-9 w-9 rounded-full bg-secondary animate-pulse" />
        ) : session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full overflow-hidden hover:opacity-80 transition-opacity p-0 border border-border">
                 <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                        {session.user?.name?.charAt(0) || "U"}
                    </span>
                 </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-card border-border shadow-lg rounded-md mt-2" align="end">
              <DropdownMenuLabel className="font-normal p-3">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-foreground">{session.user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <Link href="/settings" passHref>
                <DropdownMenuItem className="cursor-pointer p-2.5 focus:bg-secondary text-sm">
                    <UserIcon size={16} className="text-muted-foreground mr-2" />
                    <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/settings" passHref>
                <DropdownMenuItem className="cursor-pointer p-2.5 focus:bg-secondary text-sm">
                    <SettingsIcon size={16} className="text-muted-foreground mr-2" />
                    <span>Settings</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem 
                className="cursor-pointer p-2.5 text-destructive focus:bg-destructive/10 text-sm"
                onClick={() => signOut({ callbackUrl: "/signin" })}
              >
                <LogOut size={16} className="mr-2" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button 
            className="bg-primary hover:bg-primary/90 text-white rounded-md px-4 h-9 shadow-sm text-sm font-medium"
            onClick={() => window.location.href = "/signin"}
          >
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
