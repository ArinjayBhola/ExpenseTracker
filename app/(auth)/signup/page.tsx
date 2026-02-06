"use client";

import { signUp } from "@/app/actions/auth";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FaSpinner, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaFacebookF, FaCheck, FaGoogle } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    try {
        const result = await signUp(formData);

        if (result?.error) {
            toast.error(result.error);
            setIsLoading(false);
        } else {
            toast.success("Account created successfully!");
            router.push("/signin");
        }
    } catch (error) {
        toast.error("An error occurred during sign up.");
        setIsLoading(false);
    }
  }

  return (
    <div className="space-y-10">
      {/* Top Navigation */}
      <div className="absolute top-8 right-8 z-50">
         <p className="text-sm font-bold text-slate-400">
            Already member? <Link href={"/signin"} className="text-primary hover:underline ml-1">Sign in</Link>
         </p>
      </div>

      {/* Hero Section */}
      <div className="space-y-4">
        <h1 className="text-5xl font-black tracking-tight text-slate-900">Sign Up</h1>
        <p className="text-slate-400 font-semibold tracking-wide text-sm opacity-80">
            Secure Your Communication with Finance
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          {/* Full Name */}
          <div className="group relative border-b border-slate-100 pb-2 focus-within:border-primary transition-colors">
            <div className="flex items-center gap-3 h-12">
               <FaUser className="text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
               <input
                 id="name"
                 name="name"
                 placeholder="Name"
                 required
                 className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-300 font-bold text-base"
               />
               <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center">
                  <FaCheck size={12} className="text-emerald-500" />
               </div>
            </div>
          </div>

          {/* Email */}
          <div className="group relative border-b border-slate-100 pb-2 focus-within:border-primary transition-colors">
            <div className="flex items-center gap-3 h-12">
               <FaEnvelope className="text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
               <input
                 id="email"
                 name="email"
                 placeholder="Email"
                 required
                 type="email"
                 className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-300 font-bold text-base"
               />
               <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center">
                  <FaCheck size={12} className="text-emerald-500" />
               </div>
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

          {/* Re-type Password */}
          <div className="group relative border-b border-slate-100 pb-2 mt-8 opacity-40 grayscale focus-within:grayscale-0 focus-within:opacity-100 transition-all">
            <div className="flex items-center gap-3 h-12">
               <FaLock className="text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
               <input
                 placeholder="Re-Type Password"
                 required
                 type={showConfirmPassword ? "text" : "password"}
                 className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-300 font-bold text-base"
               />
               <button 
                 type="button" 
                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                 className="text-slate-300 hover:text-primary transition-colors focus:outline-none"
               >
                 {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
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
                    <span className="text-sm font-bold tracking-widest mx-auto">Sign up →</span>
                </>
            }
          </Button>
        </div>
      </form>
    </div>
  );
}
