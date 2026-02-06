"use client";

import Link from "next/link";
import { BadgeIndianRupee, CheckCircle2, ArrowRight, Zap, Shield, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Navigation */}
      <nav className="w-full max-w-7xl px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <BadgeIndianRupee className="text-white" size={24} />
           </div>
           <span className="text-xl font-bold text-foreground">Finance</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
        </div>
        <div className="flex items-center gap-4">
            <Link href="/signin">
                <Button variant="ghost" className="rounded-2xl px-6">Sign In</Button>
            </Link>
            <Link href="/signup">
                <Button className="premium-gradient text-white rounded-2xl px-6 h-11 border-none shadow-lg shadow-primary/20">
                    Get Started
                </Button>
            </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full max-w-7xl px-8 pt-20 pb-32 text-center pointer-events-none">
        {/* Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <div className="pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <Zap size={14} />
                AI-POWERED FINANCIAL TRACKING
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                Take control of <br />
                <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                    your wealth today.
                </span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                The most advanced financial dashboard for modern creators and entrepreneurs. 
                Track, analyze, and optimize your money with ease.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000">
                <Link href="/signup">
                    <Button size="lg" className="premium-gradient text-white rounded-2xl px-12 h-14 border-none shadow-xl shadow-primary/30 text-lg font-bold">
                        Get Started Free
                        <ArrowRight className="ml-2" />
                    </Button>
                </Link>
                <Link href="/signin">
                    <Button size="lg" variant="outline" className="rounded-2xl px-12 h-14 border-border/60 glass-panel text-lg font-bold">
                        View Demo
                    </Button>
                </Link>
            </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="w-full max-w-7xl px-8 py-32 bg-secondary/30 rounded-[4rem] border border-border/20">
        <div className="text-center mb-16 px-4">
            <h2 className="text-4xl font-bold mb-4">Features for the Future</h2>
            <p className="text-muted-foreground">Everything you need to manage your finances in one place.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            {[
                { title: "AI Analytics", icon: BarChart3, desc: "Predictive insights powered by cutting-edge AI." },
                { title: "Bank Shield", icon: Shield, desc: "Military-grade encryption for all your data." },
                { title: "Smart Workspaces", icon: Zap, desc: "Collaborate on finances with your team easily." },
            ].map((f, i) => (
                <div key={i} className="glass-panel p-10 rounded-3xl glow-hover">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                        <f.icon size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full mt-auto py-20 px-8 border-t border-border/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 premium-gradient rounded-lg flex items-center justify-center">
                    <BadgeIndianRupee className="text-white" size={18} />
                </div>
                <span className="font-bold">Finance</span>
            </div>
            <p className="text-muted-foreground text-sm">© 2026 FinanceTracker AI. All rights reserved.</p>
            <div className="flex gap-8 text-sm font-medium text-muted-foreground">
                <Link href="/privacy" className="hover:text-primary">Privacy</Link>
                <Link href="/terms" className="hover:text-primary">Terms</Link>
            </div>
        </div>
      </footer>
    </div>
  );
}
