import { db } from "@/lib/db";
export const dynamic = 'force-dynamic';
import { users, usages, subscriptions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const checkIfUserExists = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!checkIfUserExists) {
    const [createUser] = await db.insert(users).values({
      email,
    }).returning();

    await db.insert(usages).values({
      userId: createUser.id,
      periodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    await db.insert(subscriptions).values({
      userId: createUser.id,
      plan: "FREE",
      status: "ACTIVE",
    });

    return NextResponse.json({ message: createUser.id });
  } else {
    return NextResponse.json({ message: "User exist" });
  }
}
