"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateProfile(data: { name: string }) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "Unauthorized" };
  }
  
  if (!data.name || data.name.trim().length === 0) {
      return { error: "Name is required" };
  }

  try {
    await db.update(users).set({ 
        name: data.name.trim(),
        updatedAt: new Date()
    }).where(eq(users.id, userId));

    revalidatePath("/settings");
    revalidatePath("/dashboard"); // Update header name
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { error: "Failed to update profile" };
  }
}
