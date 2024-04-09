import { cache } from "react";
import db from "./drizzle";
import { and, count, eq, isNull } from "drizzle-orm";
import { comments, feedbacks } from "./schema";
import { notFound } from "next/navigation";

export const getFeedbacks = cache(async (category?: string) => {
  if (category) {
    const data = getFilteredFeedbacks(category);

    if (!data) {
      return notFound();
    }

    return data;
  }

  const data = await db.query.feedbacks.findMany();

  if (!data) {
    return notFound();
  }

  return data;
});

export const getFeedback = cache(async (feedbackId: number) => {
  const data = await db.query.feedbacks.findFirst({
    where: eq(feedbacks.id, feedbackId),
  });

  if (!data) {
    return notFound();
  }

  return data;
});

export const getCommentsLength = cache(async (feedbackId: number) => {
  const commentsCount = await db
    .select({ value: count() })
    .from(comments)
    .where(eq(comments.feedbackId, feedbackId))
    .execute();

  return commentsCount[0].value;
});

export const getComments = cache(async (feedbackId: number) => {
  const data = await db.query.comments.findMany({
    where: and(
      eq(comments.feedbackId, feedbackId),
      isNull(comments.replyingTo),
    ),
  });

  return data;
});

export const getReplies = cache(async (commentId: number) => {
  const data = await db.query.comments.findMany({
    where: eq(comments.replyingTo, commentId),
  });

  return data;
});

export const getFilteredFeedbacks = cache(async (category: string) => {
  const data = await db.query.feedbacks.findMany({
    where: eq(feedbacks.category, category),
  });

  return data;
});
