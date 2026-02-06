"use server";

import { db } from "@/lib/db";
import { users, usages, subscriptions } from "@/lib/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { signIn } from "../../auth";
import { AuthError } from "next-auth";

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return { error: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [newUser] = await db.insert(users).values({
      email,
      password: hashedPassword,
      name,
    }).returning();

    await db.insert(usages).values({
      userId: newUser.id,
      periodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    });

    await db.insert(subscriptions).values({
      userId: newUser.id,
      plan: "FREE",
      status: "ACTIVE",
      updatedAt: new Date(),
    });

    return { success: "Account created! You can now sign in." };
  } catch (error) {
    console.error("Sign up error:", error);
    return { error: "Something went wrong" };
  }
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
}
