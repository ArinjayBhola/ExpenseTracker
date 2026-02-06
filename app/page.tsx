"use client";

import Link from "next/link";
import { BadgeIndianRupee, CheckCircle2, ArrowRight, Zap, Shield, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-foreground">
      {/* Navigation */}
      <nav className="w-full max-w-7xl px-8 h-20 flex items-center justify-between border-b border-border/40">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <BadgeIndianRupee className="text-white" size={20} />
           </div>
           <span className="text-lg font-bold">Finance Tracker</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
        </div>
        <div className="flex items-center gap-4">
            <Link href="/signin">
                <Button variant="ghost" className="hover:text-primary">Sign In</Button>
            </Link>
            <Link href="/signup">
                <Button className="bg-primary hover:bg-primary/90 text-white shadow-sm">
                    Get Started
                </Button>
            </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full max-w-7xl px-8 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-primary text-xs font-semibold mb-8">
            <Zap size={14} />
            ENTERPRISE GRADE FINANCIAL TRACKING
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
            Take control of <br />
            <span className="text-primary">
                your wealth.
            </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10 leading-relaxed">
            The most advanced financial dashboard for modern enterprises. 
            Track, analyze, and optimize your organization's finances with precision.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-md px-8 h-12 shadow-md text-base font-medium">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </Link>
            <Link href="/signin">
                <Button size="lg" variant="outline" className="rounded-md px-8 h-12 border-border bg-card hover:bg-secondary text-base font-medium">
                    View Demo
                </Button>
            </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="w-full max-w-7xl px-8 py-24 bg-secondary/30 rounded-3xl border border-border/50">
        <div className="text-center mb-16 px-4">
            <h2 className="text-3xl font-bold mb-4">Built for Business</h2>
            <p className="text-muted-foreground">Everything you need to manage your finances in one place.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            {[
                { title: "Smart Analytics", icon: BarChart3, desc: "Predictive insights powered by advanced algorithms." },
                { title: "Bank-Grade Security", icon: Shield, desc: "Enterprise-level encryption for all your sensitive data." },
                { title: "Team Workspaces", icon: Zap, desc: "Collaborate on finances with your team securely." },
            ].map((f, i) => (
                <div key={i} className="card-classic p-8 hover:shadow-md transition-all duration-200">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                        <f.icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold mb-3">{f.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{f.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full mt-auto py-12 px-8 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                    <BadgeIndianRupee className="text-white" size={14} />
                </div>
                <span className="font-bold text-sm">Finance Tracker</span>
            </div>
            <p className="text-muted-foreground text-xs">© 2026 Finance Tracker Corp. All rights reserved.</p>
            <div className="flex gap-6 text-xs font-medium text-muted-foreground">
                <Link href="/privacy" className="hover:text-primary">Privacy</Link>
                <Link href="/terms" className="hover:text-primary">Terms</Link>
            </div>
        </div>
      </footer>
    </div>
  );
}

