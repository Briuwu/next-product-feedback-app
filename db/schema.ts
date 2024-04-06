import { relations, sql } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";

export const categoriesEnum = pgEnum("categories", [
  "Feature",
  "UI",
  "UX",
  "Enhancement",
  "Bug",
]);

export const feedbacks = pgTable("feedbacks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  detail: text("detail").notNull(),
  score: integer("score").notNull(),
  userId: text("user_id").notNull(),
  categories: categoriesEnum("categories").notNull().array(),
});

export const feedbackRelations = relations(feedbacks, ({ many }) => ({
  comments: many(comments),
}));

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  comment: text("comment").notNull(),
  feedbackId: integer("feedback_id").references(() => feedbacks.id, {
    onDelete: "cascade",
  }),
  userId: text("user_id").notNull(),
  score: integer("score").notNull(),
});

export const commentRelations = relations(comments, ({ one, many }) => ({
  feedback: one(feedbacks, {
    fields: [comments.feedbackId],
    references: [feedbacks.id],
  }),
  replies: many(replies),
}));

export const replies = pgTable("replies", {
  id: serial("id").primaryKey(),
  comment: text("comment").notNull(),
  commentId: integer("comment_id").references(() => comments.id, {
    onDelete: "cascade",
  }),
  score: integer("score").notNull(),
});

export const replyRelations = relations(replies, ({ one }) => ({
  comment: one(comments, {
    fields: [replies.commentId],
    references: [comments.id],
  }),
}));
