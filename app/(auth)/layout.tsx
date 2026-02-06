import React from "react";
import { FaRupeeSign } from "react-icons/fa6";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-white font-sans text-slate-900 overflow-hidden">
      {/* Left Side: Form Section */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 p-8 flex items-center justify-between z-10 w-full max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center shadow-lg shadow-primary/20">
              <FaRupeeSign className="text-white" size={20} />
            </div>
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1 flex items-center justify-center px-8 lg:px-24">
          <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>


      </div>

      {/* Right Side: Visual Section (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 bg-primary relative overflow-hidden">
        {/* Abstract Background Design */}
        <div className="absolute inset-0 bg-primary">
            <div className="absolute top-[-10%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
            <div className="absolute bottom-0 left-0 w-full h-full bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,transparent_60%)]" />
            
            {/* Wavy shape matching image */}
            <div className="absolute right-0 top-0 bottom-0 w-[80%] bg-[#4f46e5] rounded-l-[120px] transform translate-x-20 rotate-3 shadow-[-40px_0_80px_rgba(0,0,0,0.1)]" />
            <div className="absolute right-0 top-0 bottom-0 w-[70%] bg-[#6366f1] rounded-l-[100px] transform translate-x-32 -rotate-2" />
        </div>

        {/* Content in the visual panel */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-20">
           {/* Card 1: Balance/Stats */}
           <div className="w-72 bg-white rounded-[2.5rem] p-8 shadow-2xl animate-in slide-in-from-right-12 duration-1000 rotate-[-5deg] mb-[-40px] z-20">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Balance</p>
              <h3 className="text-3xl font-black text-slate-900 mb-6">176,18</h3>
              
              <div className="relative h-20 w-full flex items-end gap-1">
                 <div className="flex-1 bg-amber-400 h-[40%] rounded-full opacity-60" />
                 <div className="flex-1 bg-indigo-600 h-[60%] rounded-full" />
                 <div className="flex-1 bg-amber-400 h-[30%] rounded-full opacity-60" />
                 <div className="flex-1 bg-indigo-600 h-[80%] rounded-full" />
                 <div className="flex-1 bg-indigo-600 h-[45%] rounded-full opacity-60" />
              </div>
              
              <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-slate-900 border-4 border-slate-900" />
              </div>
           </div>

           {/* Floating Icons */}
           <div className="absolute top-[30%] right-[15%] w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center z-10 transform rotate-12 animate-bounce duration-3000">
               <div className="w-8 h-8 rounded-lg bg-pink-500 flex items-center justify-center text-white text-[10px]">I</div>
           </div>
           <div className="absolute bottom-[35%] right-[10%] w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center z-10 transform -rotate-12 animate-bounce duration-2500 delay-500">
               <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-black">d</div>
           </div>

           {/* Card 2: Security/Data */}
           <div className="w-80 bg-white rounded-[2.5rem] p-10 shadow-2xl animate-in slide-in-from-right-20 duration-1000 delay-300 rotate-[3deg] self-end mt-20">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-8">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-amber-500">
                    <path d="M15 11V15M15 15H11M15 15V19M15 15L19 11M8 11L6 9M8 11V7M8 11H12M12 21H12.01M12 3H12.01M3 12H3.01M21 12H21.01M7.05 16.95H7.06M16.95 7.05H16.96M7.05 7.05H7.06M16.95 16.95H16.96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-3">Your data, your rules</h4>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                Your data belongs to you, and our encryption ensures that.
              </p>
              
              <div className="mt-8 space-y-3">
                 <div className="h-2 w-3/4 bg-slate-100 rounded-full" />
                 <div className="h-2 w-1/2 bg-slate-100 rounded-full opacity-60" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
