"use server";

import { revalidatePath } from "next/cache";

import { auth, currentUser } from "@clerk/nextjs";

import db from "@/db/drizzle";
import { comments } from "@/db/schema";

export const addComment = async (comment: string, feedbackId: number) => {
  const { userId } = auth();
  const user = currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  await db.insert(comments).values({
    userId,
    feedbackId,
    comment,
  });

  revalidatePath("/");
  revalidatePath(`/feedback/${feedbackId}`);
};

export const addReply = async (
  comment: string,
  feedbackId: number,
  commentId: number,
  replyingToEmail: string,
) => {
  const { userId } = auth();
  const user = currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  await db.insert(comments).values({
    userId,
    feedbackId,
    comment,
    replyingTo: commentId,
    replyingToEmail,
  });

  revalidatePath("/");
  revalidatePath(`/feedback/${feedbackId}`);
};
