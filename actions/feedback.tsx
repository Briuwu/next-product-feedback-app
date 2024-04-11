"use server";
import { auth, currentUser } from "@clerk/nextjs";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import db from "@/db/drizzle";
import { and, eq } from "drizzle-orm";
import { feedbacks, votes } from "@/db/schema";

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
    scores: 0,
  });

  revalidatePath("/");
  revalidatePath("/feedback");
  redirect("/");
};

export const updateFeedbackVote = async (feedbackId: number) => {
  const { userId } = auth();
  const user = currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const hasVoted = await db.query.votes.findFirst({
    where: and(eq(votes.feedbackId, feedbackId), eq(votes.userId, userId)),
  });

  const currentScore = await db
    .select({ value: feedbacks.scores })
    .from(feedbacks)
    .where(eq(feedbacks.id, feedbackId))
    .execute();

  if (hasVoted) {
    await db.delete(votes).where(eq(votes.feedbackId, feedbackId));
    await db
      .update(feedbacks)
      .set({
        scores: currentScore[0].value - 1,
      })
      .where(eq(feedbacks.id, feedbackId));

    revalidatePath("/");
    revalidatePath(`/feedback/${feedbackId}`);
    return;
  }

  await db
    .update(feedbacks)
    .set({
      scores: currentScore[0].value + 1,
    })
    .where(eq(feedbacks.id, feedbackId));

  await db.insert(votes).values({
    userId,
    feedbackId,
  });

  revalidatePath("/");
  revalidatePath(`/feedback/${feedbackId}`);
};
