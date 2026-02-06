"use server";

import { db } from "@/lib/db";
import { workspaces, workspaceMembers, transactions } from "@/lib/db/schema";
import { auth } from "@/auth";
import { eq, or, sql, desc, count, and } from "drizzle-orm";
import { checkUsageLimit } from "@/lib/subscription";

export async function getWorkspaces() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "Unauthorized" };
  }

  try {
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
      },
      orderBy: [desc(workspaces.createdAt)]
    });

    const workspacesWithCount = await Promise.all(result.map(async (ws) => {
      const [transResult] = await db.select({ value: count() }).from(transactions).where(eq(transactions.workspaceId, ws.id));
      return {
        ...ws,
        _count: { transactions: transResult.value }
      };
    }));

    return { workspaces: workspacesWithCount };
  } catch (error) {
    console.error("Failed to fetch workspaces:", error);
    return { error: "Failed to fetch workspaces" };
  }
}

export async function createWorkspace(name: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "Unauthorized" };
  }

  const canCreate = await checkUsageLimit(userId, 'workspaces');
  if (!canCreate) {
    return { error: "Workspace limit reached. Upgrade to Pro." };
  }

  if (!name || name.trim().length === 0) {
    return { error: "Name is required" };
  }

  try {
    const [newWorkspace] = await db.insert(workspaces).values({
      name: name.trim(),
      ownerId: userId
    }).returning();

    return { success: true, workspace: newWorkspace };
  } catch (error) {
    console.error("Failed to create workspace:", error);
    return { error: "Failed to create workspace" };
  }
}

export async function deleteWorkspace(id: string) {
    const session = await auth();
    const userId = session?.user?.id;
  
    if (!userId) {
      return { error: "Unauthorized" };
    }
  
    try {
        // Only owner can delete
      const workspace = await db.query.workspaces.findFirst({
        where: and(eq(workspaces.id, id), eq(workspaces.ownerId, userId))
      });

      if (!workspace) {
        return { error: "Workspace not found or unauthorized" };
      }

      await db.delete(workspaces).where(eq(workspaces.id, id));
      return { success: true };
    } catch (error) {
      console.error("Failed to delete workspace:", error);
      return { error: "Failed to delete workspace" };
    }
}
