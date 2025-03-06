import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" });
    }
    return NextResponse.json({ message: user.id });
  } catch (error) {
    return NextResponse.json({ message: "An error occurred", error: error });
  }
}
