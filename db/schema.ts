import { relations, sql } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const feedbacks = pgTable("feedbacks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  detail: text("detail").notNull(),
  score: integer("score").notNull(),
  userId: text("user_id").notNull(),
  category: text("category").notNull(),
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
  replyingTo: integer("replying_to").default(sql`NULL`),
});

export const commentRelations = relations(comments, ({ one }) => ({
  feedback: one(feedbacks, {
    fields: [comments.feedbackId],
    references: [feedbacks.id],
  }),
}));
