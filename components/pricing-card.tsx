import { useState } from 'react'
import { PLANS } from '@/lib/plans'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Star, Loader2 } from 'lucide-react'

interface PricingCardProps {
  plan: keyof typeof PLANS
  currentPlan?: string
  onUpgrade: (plan: keyof typeof PLANS) => void
  loading?: boolean
}

export function PricingCard({ plan, currentPlan, onUpgrade, loading }: PricingCardProps) {
  const planConfig = PLANS[plan]
  const isCurrentPlan = currentPlan === plan
  const isPopular = plan === 'PRO'

  return (
    <Card className={`relative ${isPopular ? 'border-primary shadow-lg' : ''}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Star className="w-3 h-3" />
            Popular
          </div>
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {planConfig.name}
          {isCurrentPlan && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Current
            </span>
          )}
        </CardTitle>
        <CardDescription>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">${planConfig.price}</span>
            <span className="text-muted-foreground">/month</span>
          </div>
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-2">
          {planConfig.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          variant={isCurrentPlan ? "outline" : "default"}
          disabled={isCurrentPlan || loading}
          onClick={() => onUpgrade(plan)}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : isCurrentPlan ? 'Current Plan' : 'Upgrade'}
        </Button>
      </CardFooter>
    </Card>
  )
}