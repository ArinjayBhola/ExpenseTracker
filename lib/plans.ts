export const PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    features: [
      'Up to 50 transactions per month',
      'Basic expense tracking',
      'Simple reports',
      '1 workspace'
    ],
    limits: {
      transactions: 50,
      reports: 5,
      apiCalls: 100,
      workspaces: 1
    }
  },
  BASIC: {
    name: 'Basic',
    price: 9.99,
    features: [
      'Up to 500 transactions per month',
      'Advanced expense tracking',
      'Detailed reports & analytics',
      '3 workspaces',
      'CSV export'
    ],
    limits: {
      transactions: 500,
      reports: 50,
      apiCalls: 1000,
      workspaces: 3
    }
  },
  PRO: {
    name: 'Pro',
    price: 29.99,
    features: [
      'Unlimited transactions',
      'AI-powered insights',
      'Advanced analytics',
      '10 workspaces',
      'Priority support',
      'API access'
    ],
    limits: {
      transactions: -1,
      reports: -1,
      apiCalls: 10000,
      workspaces: 10
    }
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 99.99,
    features: [
      'Everything in Pro',
      'Unlimited workspaces',
      'Custom integrations',
      'Dedicated support',
      'White-label options'
    ],
    limits: {
      transactions: -1,
      reports: -1,
      apiCalls: -1,
      workspaces: -1
    }
  }
} as const

export type Plan = keyof typeof PLANS