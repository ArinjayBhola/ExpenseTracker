"use server";

import { db } from "@/lib/db";
import { transactions } from "@/lib/db/schema";
import { auth } from "@/auth";
import { desc, eq, and, like, gte, lte } from "drizzle-orm";

export async function getUserTransactions(
  search?: string,
  category?: string,
  startDate?: Date,
  endDate?: Date
) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "Unauthorized" };
  }

  try {
    const filters = [eq(transactions.userId, userId)];

    if (search) {
      filters.push(like(transactions.title, `%${search}%`));
    }

    if (category && category !== "all") {
      filters.push(eq(transactions.category, category));
    }

    if (startDate) {
      filters.push(gte(transactions.date, startDate));
    }
    
    if (endDate) {
        filters.push(lte(transactions.date, endDate));
    }

    const data = await db.query.transactions.findMany({
      where: and(...filters),
      orderBy: [desc(transactions.date)],
      // Limit to 50 for now, implement pagination later if needed
      limit: 50,
    });

    return { transactions: data };
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    return { error: "Failed to fetch transactions" };
  }
}

export async function addTransaction(data: {
  title: string;
  amount: number;
  category: string;
  date: Date;
}) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "Unauthorized" };
  }

  try {
    const [newTransaction] = await db.insert(transactions).values({
      title: data.title,
      amount: data.amount,
      category: data.category,
      date: data.date,
      userId: userId,
      updatedAt: new Date(),
    }).returning();

    return { success: true, transaction: newTransaction };
  } catch (error) {
    console.error("Failed to add transaction:", error);
    return { error: "Failed to add transaction" };
  }
}

export async function deleteTransaction(id: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "Unauthorized" };
  }

  try {
    await db.delete(transactions).where(and(eq(transactions.id, id), eq(transactions.userId, userId)));
    return { success: true };
  } catch (error) {
    console.error("Failed to delete transaction:", error);
    return { error: "Failed to delete transaction" };
  }
}
