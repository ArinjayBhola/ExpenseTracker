import { db } from "@/lib/db";
export const dynamic = 'force-dynamic';
import { transactions } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { incrementUsage } from "@/lib/subscription";

export async function POST(req: NextRequest) {
  const { category, amount, userId, title } = await req.json();
  
  if (!category || !amount || !userId || !title) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  try {
    await incrementUsage(userId, 'transactions')

    const [newTransaction] = await db.insert(transactions).values({
      category: category,
      amount: parseFloat(amount),
      userId: userId,
      title: title,
    }).returning();

    return NextResponse.json({ message: "Transaction added", data: newTransaction.id });
  } catch (error: any) {
    if (error.message.includes('Usage limit exceeded')) {
      return NextResponse.json({ 
        error: "Transaction limit reached. Upgrade your plan to continue." 
      }, { status: 429 });
    }
    return NextResponse.json({ message: "An error occurred", error: error.message }, { status: 500 });
  }
}
