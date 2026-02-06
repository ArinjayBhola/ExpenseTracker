"use server";

import { db } from "@/lib/db";
import { subscriptions, usages, transactions, workspaces } from "@/lib/db/schema";
import { auth } from "@/auth";
import { eq, count } from "drizzle-orm";
import { PLANS } from "@/lib/plans";

export async function getBillingInfo() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "Unauthorized" };
  }

  try {
    const subscription = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.userId, userId),
    });

    // Calculate usage
    // For transactions: count all
    const [txnResult] = await db.select({ value: count() }).from(transactions).where(eq(transactions.userId, userId));
    const txnCount = txnResult.value;

    // For workspaces: count all where owner
    const [wsResult] = await db.select({ value: count() }).from(workspaces).where(eq(workspaces.ownerId, userId));
    const wsCount = wsResult.value;

    return {
      plan: subscription?.plan || "FREE",
      usage: {
        transactions: txnCount,
        workspaces: wsCount,
        reports: 0 // Placeholder as no report feature yet
      }
    };
  } catch (error) {
    console.error("Failed to fetch billing info:", error);
    return { error: "Failed to fetch" };
  }
}
