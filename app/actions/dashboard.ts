"use server";

import { db } from "@/lib/db";
import { transactions, users } from "@/lib/db/schema";
import { auth } from "@/auth";
import { desc, eq, sql } from "drizzle-orm";

export async function getDashboardStats() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "Unauthorized" };
  }

  try {
    // Fetch all transactions for the user
    const userTransactions = await db.query.transactions.findMany({
      where: eq(transactions.userId, userId),
      orderBy: [desc(transactions.date)],
    });

    // Calculate stats
    let totalBalance = 0;
    let income = 0;
    let expenses = 0;

    for (const t of userTransactions) {
      totalBalance += t.amount;
      if (t.amount > 0) {
        income += t.amount;
      } else {
        expenses += Math.abs(t.amount);
      }
    }

    // Get recent transactions (first 5)
    const recentTransactions = userTransactions.slice(0, 5);

    return {
      stats: {
        totalBalance,
        income,
        expenses,
      },
      recentTransactions,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return { error: "Failed to fetch data" };
  }
}
