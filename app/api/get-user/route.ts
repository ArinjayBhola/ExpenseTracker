import { db } from "@/lib/db";
export const dynamic = 'force-dynamic';
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { incrementUsage } from "@/lib/subscription";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  try {
    // Note: incrementUsage now expects userId, not email. 
    // We should fetch the user first.
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
      with: {
        subscription: true,
        usage: true
      }
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" });
    }

    await incrementUsage(user.id, 'apiCalls');
    
    return NextResponse.json({ 
      message: user.id,
      subscription: user.subscription,
      usage: user.usage
    });
  } catch (error: any) {
    if (error.message.includes('Usage limit exceeded')) {
      return NextResponse.json({ 
        error: "API limit reached. Upgrade your plan to continue." 
      }, { status: 429 });
    }
    
    return NextResponse.json({ message: "An error occurred", error: error });
  }
}
