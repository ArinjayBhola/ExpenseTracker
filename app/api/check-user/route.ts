import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const checkIfUserExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!checkIfUserExists) {
    const createUser = await prisma.user.create({
      data: {
        email,
      },
    });

    return NextResponse.json({ message: createUser.id });
  } else {
    return NextResponse.json({ message: "User exist" });
  }
}
