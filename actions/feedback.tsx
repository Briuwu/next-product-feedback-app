"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth, currentUser } from "@clerk/nextjs";

import db from "@/db/drizzle";
import { feedbacks } from "@/db/schema";

type Feedback = Omit<typeof feedbacks.$inferSelect, "id" | "userId" | "score">;

export const upsertFeedback = async (feedback: Feedback) => {
  const { userId } = auth();
  const user = currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  await db.insert(feedbacks).values({
    userId,
    category: feedback.category,
    detail: feedback.detail,
    title: feedback.title,
    score: 0,
  });

  revalidatePath("/");
  revalidatePath("/feedback");
  redirect("/");
};
