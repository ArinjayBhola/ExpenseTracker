"use client";

import Link from "next/link";
import { FaHouse, FaTriangleExclamation } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Abstract Background Design */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[100px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 blur-[100px] rounded-full" />
      </div>

      <div className="card-classic p-12 rounded-2xl text-center max-w-md w-full relative z-10 animate-in fade-in zoom-in-95 duration-500 shadow-xl border-border">
        <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
           <FaTriangleExclamation className="text-red-500 text-4xl" />
        </div>
        
        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-linear-to-br from-slate-900 to-slate-600 mb-2">404</h1>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Page Not Found</h2>
        <p className="text-slate-500 mb-10 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Link href="/dashboard">
          <Button className="w-full h-12 rounded-lg bg-primary hover:bg-primary/90 text-white text-base font-medium shadow-md transition-all">
             <FaHouse className="mr-2" />
             Return to Dashboard
          </Button>
        </Link>
        
        <div className="mt-8">
            <Link href="/" className="text-sm font-semibold text-slate-400 hover:text-primary transition-colors">
                Go to Home Page
            </Link>
        </div>
      </div>
    </div>
  );
}
