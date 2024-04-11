import { cache } from "react";
import db from "./drizzle";
import { and, asc, count, desc, eq, isNull } from "drizzle-orm";
import { comments, feedbacks, votes } from "./schema";
import { notFound } from "next/navigation";

export const getFeedbacks = cache(async (category?: string, sort?: string) => {
  const data = await db.query.feedbacks.findMany({
    orderBy: [desc(feedbacks.scores)],
    with: {
      comments: true,
    },
  });

  if (!data) return [];

  const filteredFeedbacks = data.filter((feed) => {
    if (category) {
      return feed.category === category;
    }
    return true;
  });

  const sortedFeedbacks = filteredFeedbacks.sort((a, b) => {
    switch (sort) {
      case "most-upvote":
        return b.scores - a.scores;
      case "least-upvote":
        return a.scores - b.scores;
      case "most-comment":
        return b.comments.length - a.comments.length;
      case "least-comment":
        return a.comments.length - b.comments.length;
      default:
        return 0;
    }
  });

  return sortedFeedbacks;
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

export const getVotes = cache(async (feedbackId: number, voter: string) => {
  const data = await db.query.votes.findFirst({
    where: and(eq(votes.feedbackId, feedbackId), eq(votes.userId, voter)),
  });

  return data;
});

export const getFeedbackStatus = cache(async () => {
  const data = await getFeedbacks();

  const planned = data.filter((feed) => feed.status === "planned").length;
  const inProgress = data.filter(
    (feed) => feed.status === "in-progress",
  ).length;
  const live = data.filter((feed) => feed.status === "live").length;

  return {
    planned: planned ? planned : 0,
    inProgress: inProgress ? inProgress : 0,
    live: live ? live : 0,
  };
});

export const getFeedbackByStatus = cache(async (status: string) => {
  const data = await db.query.feedbacks.findMany({
    where: eq(feedbacks.status, status),
  });

  return data;
});
