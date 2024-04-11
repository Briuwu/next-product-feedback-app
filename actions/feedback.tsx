"use server";
import { auth, currentUser } from "@clerk/nextjs";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import db from "@/db/drizzle";
import { and, eq } from "drizzle-orm";
import { feedbacks, votes } from "@/db/schema";

type Feedback = typeof feedbacks.$inferSelect;

type PartialFeedback = Omit<Feedback, "id" | "userId" | "scores">;

export const upsertFeedback = async (feedback: PartialFeedback) => {
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
    status: feedback.status,
  });

  revalidatePath("/");
  revalidatePath("/feedback");
  redirect("/");
};

export const updateFeedback = async (
  feedbackId: number,
  feedback: PartialFeedback,
) => {
  const { userId } = auth();
  const user = currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  await db
    .update(feedbacks)
    .set({
      category: feedback.category,
      detail: feedback.detail,
      title: feedback.title,
      status: feedback.status,
    })
    .where(eq(feedbacks.id, feedbackId));

  revalidatePath("/");
  revalidatePath(`/feedback/${feedbackId}`);
  revalidatePath(`/feedback/${feedbackId}/edit`);
  redirect(`/feedback/${feedbackId}`);
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

export const deleteFeedback = async (feedbackId: number) => {
  const { userId } = auth();
  const user = currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  await db.delete(feedbacks).where(eq(feedbacks.id, feedbackId));

  revalidatePath("/");
  revalidatePath("/feedback");
  redirect("/");
};
