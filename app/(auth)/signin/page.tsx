"use client";

import { login } from "@/app/actions/auth";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FaSpinner, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaFacebookF, FaGoogle } from "react-icons/fa6";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    try {
        const result = await login(formData);
        if (result?.error) {
            toast.error(result.error);
            setIsLoading(false);
        }
    } catch (error) {
        toast.error("Something went wrong. Please try again.");
        setIsLoading(false);
    }
  }

  return (
    <div className="space-y-10">
      {/* Top Navigation */}
      <div className="absolute top-8 right-8 z-50">
         <p className="text-sm font-bold text-slate-400">
            New member? <Link href="/signup" className="text-primary hover:underline ml-1">Join now</Link>
         </p>
      </div>

      {/* Hero Section */}
      <div className="space-y-4">
        <h1 className="text-5xl font-black tracking-tight text-slate-900">Sign In</h1>
        <p className="text-slate-400 font-semibold tracking-wide text-sm opacity-80">
            Welcome back! Please enter your details.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="space-y-8">
          {/* Email */}
          <div className="group relative border-b border-slate-100 pb-2 focus-within:border-primary transition-colors">
            <div className="flex items-center gap-3 h-12">
               <FaEnvelope className="text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
               <input
                 id="email"
                 name="email"
                 placeholder="Enter your email"
                 required
                 type="email"
                 className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-300 font-bold text-base"
               />
            </div>
          </div>

          {/* Password */}
          <div className="group relative border-b border-slate-100 pb-2 focus-within:border-primary transition-colors">
            <div className="flex items-center gap-3 h-12">
               <FaLock className="text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
               <input
                 id="password"
                 name="password"
                 required
                 type={showPassword ? "text" : "password"}
                 placeholder="Password"
                 className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-300 font-bold text-base tracking-widest"
               />
               <button 
                 type="button" 
                 onClick={() => setShowPassword(!showPassword)}
                 className="text-slate-300 hover:text-primary transition-colors focus:outline-none"
               >
                 {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
               </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-6 pt-4">
          <Button
            className="flex-1 bg-primary text-white h-14 rounded-full text-sm font-black shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-between px-8"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <FaSpinner className="h-6 w-6 animate-spin mx-auto" /> : 
                <>
                    <span className="text-sm font-bold tracking-widest mx-auto">Sign in →</span>
                </>
            }
          </Button>
        </div>
      </form>
    </div>
  );
}
