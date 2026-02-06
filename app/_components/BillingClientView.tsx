"use client";

import { useState } from "react";
import { PricingCard } from "@/components/pricing-card";
import { PLANS } from "@/lib/plans";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface BillingInfo {
  plan: string;
  usage: {
    transactions: number;
    workspaces: number;
    reports: number;
  };
}

interface BillingClientViewProps {
  billingInfo: BillingInfo;
}

export default function BillingClientView({ billingInfo }: BillingClientViewProps) {
  const [loading, setLoading] = useState(false);
  const currentPlan = billingInfo.plan;
  const usage = billingInfo.usage;

  const handleUpgrade = async (plan: keyof typeof PLANS) => {
    setLoading(true);
    try {
      // Logic for upgrade (Stripe integration or dummy)
      // For now, simple toast
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.info(`Upgrade to ${plan} initiated. (Payment integeration required)`);
    } catch (error) {
      toast.error("Upgrade failed");
    } finally {
      setLoading(false);
    }
  };

  const planConfig = PLANS[currentPlan as keyof typeof PLANS] || PLANS["FREE"];
  const txnLimit = planConfig.limits.transactions;
  const wsLimit = planConfig.limits.workspaces;
  
  const txnPercent = txnLimit === -1 ? 0 : Math.min(100, (usage.transactions / txnLimit) * 100);

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold">Billing & Subscription</h1>
        <p className="text-muted-foreground">Manage your subscription and usage</p>
      </div>

      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
            Current Plan
            <Badge variant="outline" className="border-indigo-500 text-indigo-400">{planConfig.name}</Badge>
          </CardTitle>
          <CardDescription className="text-gray-400">
            You are currently on the {planConfig.name} plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Transaction Usage</span>
              <span className="text-gray-400">{usage.transactions} / {txnLimit === -1 ? '∞' : txnLimit}</span>
            </div>
            <Progress value={txnPercent} className="h-2 bg-gray-700"  /> 
            {/* Note: indicatorColor prop might be needed on Progress if custom styling doesn't apply automatically */}
          </div>
          
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <span className="text-gray-400">Workspaces:</span>
              <span className="font-medium">{usage.workspaces} / {wsLimit === -1 ? '∞' : wsLimit}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <span className="text-gray-400">Reports:</span>
              <span className="font-medium">{usage.reports} / ∞</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div>
        <h2 className="text-2xl font-semibold mb-6">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(Object.keys(PLANS) as Array<keyof typeof PLANS>).map((plan) => (
            <PricingCard
              key={plan}
              plan={plan}
              currentPlan={currentPlan}
              onUpgrade={handleUpgrade}
              loading={loading}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
