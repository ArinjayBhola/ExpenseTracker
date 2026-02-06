"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

export function UserGuide() {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(0);

    useEffect(() => {
        const hasSeen = localStorage.getItem("hasSeenUserGuide");
        if (!hasSeen) {
            // Small delay to let page load
            const timer = setTimeout(() => setOpen(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setOpen(false);
        localStorage.setItem("hasSeenUserGuide", "true");
    };

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            handleClose();
        }
    };

    const steps = [
        {
            title: "Welcome to FinanceTracker",
            description: "Your all-in-one solution for managing personal and business finances.",
            image: "💰"
        },
        {
            title: "Create Workspaces",
            description: "Organize your expenses by creating separate workspaces for 'Personal', 'Business', or 'Vacation'.",
            image: "📂"
        },
        {
            title: "Track Transactions",
            description: "Easily add income and expenses. Categorize them to see where your money goes.",
            image: "📝"
        },
        {
            title: "View Insights",
            description: "Visualize your spending habits with interactive charts and monthly trends.",
            image: "📊"
        }
    ];

    const currentStep = steps[step];

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="text-4xl mb-4 text-center">{currentStep.image}</div>
                    <DialogTitle className="text-center text-xl">{currentStep.title}</DialogTitle>
                    <DialogDescription className="text-center mt-2">
                        {currentStep.description}
                    </DialogDescription>
                </DialogHeader>
                
                <div className="flex justify-center gap-1 my-4">
                    {steps.map((_, i) => (
                        <div 
                            key={i} 
                            className={`h-2 w-2 rounded-full transition-colors ${i === step ? "bg-primary" : "bg-primary/20"}`} 
                        />
                    ))}
                </div>

                <DialogFooter>
                    <Button onClick={handleNext} className="w-full bg-primary hover:bg-primary/90 text-white">
                        {step === steps.length - 1 ? (
                            <>Get Started <Check size={16} className="ml-2" /></>
                        ) : (
                            <>Next <ArrowRight size={16} className="ml-2" /></>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
