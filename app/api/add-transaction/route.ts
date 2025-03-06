import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { category, amount, userId } = await req.json();
  console.log(userId);
  if (!category || !amount || !userId) {
    return NextResponse.json({ message: `${category} ${amount} ${userId}` });
  }
  try {
    const data = await prisma.transaction.create({
      data: {
        category: category,
        amount: amount,
        userId: userId,
      },
    });

    return NextResponse.json({ message: "Transaction added", data: data.id });
  } catch (error) {
    return NextResponse.json({ message: "An error occurred", error: error });
  }
}
