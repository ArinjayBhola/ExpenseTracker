import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export const dynamic = 'force-dynamic';
import { db } from '@/lib/db'
import { workspaces, workspaceMembers, transactions } from '@/lib/db/schema'
import { eq, or, count, sql } from 'drizzle-orm'
import { checkUsageLimit } from '@/lib/subscription'

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    const userId = session?.user?.id
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await db.query.workspaces.findMany({
      where: or(
        eq(workspaces.ownerId, userId),
        sql`exists (select 1 from "WorkspaceMember" where "workspaceId" = "workspaces"."id" and "userId" = ${userId})`
      ),
      with: {
        owner: true,
        members: {
          with: { user: true }
        }
      }
    })

    const workspacesWithCount = await Promise.all(result.map(async (ws: any) => {
      const [transResult] = await db.select({ value: count() }).from(transactions).where(eq(transactions.workspaceId, ws.id));
      return {
        ...ws,
        _count: { transactions: transResult.value }
      }
    }));

    return NextResponse.json({ workspaces: workspacesWithCount })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch workspaces' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    const userId = session?.user?.id
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const canCreate = await checkUsageLimit(userId, 'workspaces')
    if (!canCreate) {
      return NextResponse.json({ 
        error: 'Workspace limit reached. Upgrade your plan to create more workspaces.' 
      }, { status: 429 })
    }

    const { name } = await req.json()

    if (!name || name.trim().length === 0) {
      return NextResponse.json({ error: 'Workspace name is required' }, { status: 400 })
    }

    const [newWorkspace] = await db.insert(workspaces).values({
      name: name.trim(),
      ownerId: userId
    }).returning()

    return NextResponse.json({ workspace: newWorkspace })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create workspace' }, { status: 500 })
  }
}