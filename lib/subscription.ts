import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { users, usages, workspaces } from '@/lib/db/schema'
import { eq, sql, count } from 'drizzle-orm'
import { PLANS } from '@/lib/plans'

export async function requireSubscription(request: NextRequest) {
  const session = await auth()
  const userId = session?.user?.id
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: { subscription: true, usage: true }
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const plan = user.subscription?.plan || 'FREE'
  const planConfig = PLANS[plan as keyof typeof PLANS]

  if (!user.usage) {
    await db.insert(usages).values({
      userId,
      periodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    })
    const usage = await db.query.usages.findFirst({ where: eq(usages.userId, userId) })
    return { user, plan, planConfig, usage }
  }

  return { user, plan, planConfig, usage: user.usage }
}

export async function checkUsageLimit(
  userId: string, 
  type: 'transactions' | 'reports' | 'apiCalls' | 'workspaces'
) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: { subscription: true, usage: true }
  })

  if (!user || !user.usage) return false

  const plan = user.subscription?.plan || 'FREE'
  const planConfig = PLANS[plan as keyof typeof PLANS]
  const limit = planConfig.limits[type]

  if (limit === -1) return true

  if (type === 'workspaces') {
    const [result] = await db
      .select({ value: count() })
      .from(workspaces)
      .where(eq(workspaces.ownerId, userId))
    
    return result.value < limit
  }

  const currentUsage = (user.usage as any)[type] || 0
  return currentUsage < limit
}

export async function incrementUsage(
  userId: string, 
  type: 'transactions' | 'reports' | 'apiCalls'
) {
  const canIncrement = await checkUsageLimit(userId, type)
  
  if (!canIncrement) {
    throw new Error(`Usage limit exceeded for ${type}`)
  }

  await db.update(usages)
    .set({ [type]: sql`${usages[type]} + 1` })
    .where(eq(usages.userId, userId))
}