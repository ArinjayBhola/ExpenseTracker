import { db } from "@/lib/db";
export const dynamic = 'force-dynamic';
import { transactions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { checkUsageLimit, incrementUsage } from "@/lib/subscription";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();
  if (!userId) {
    return NextResponse.json({ message: "Invalid Request" }, { status: 400 });
  }

  try {
    const canAccess = await checkUsageLimit(userId, 'transactions');
    if (!canAccess) {
      return NextResponse.json({ 
        error: "Transaction limit reached. Upgrade your plan to continue." 
      }, { status: 429 });
    }

    await incrementUsage(userId, 'apiCalls');

    const result = await db.query.transactions.findMany({
      where: eq(transactions.userId, userId),
    });

    return NextResponse.json({ message: result });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
