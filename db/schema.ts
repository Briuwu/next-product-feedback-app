import { relations, sql } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const feedbacks = pgTable("feedbacks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  detail: text("detail").notNull(),
  userId: text("user_id").notNull(),
  category: text("category").notNull(),
  scores: integer("scores")
    .default(sql`0`)
    .notNull(),
  status: text("status")
    .default(sql`'suggestion'`)
    .notNull(),
});

export const feedbackRelations = relations(feedbacks, ({ many }) => ({
  comments: many(comments),
}));

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  comment: text("comment").notNull(),
  feedbackId: integer("feedback_id")
    .references(() => feedbacks.id, {
      onDelete: "cascade",
    })
    .notNull(),
  userId: text("user_id").notNull(),
  replyingTo: integer("replying_to").default(sql`NULL`),
  replyingToEmail: text("replying_to_email").default(sql`NULL`),
});

export const commentRelations = relations(comments, ({ one }) => ({
  feedback: one(feedbacks, {
    fields: [comments.feedbackId],
    references: [feedbacks.id],
  }),
}));

export const votes = pgTable("votes", {
  id: serial("id").primaryKey(),
  feedbackId: integer("feedback_id")
    .references(() => feedbacks.id, {
      onDelete: "cascade",
    })
    .notNull(),
  userId: text("user_id").notNull(),
});

export const votesRelations = relations(votes, ({ one }) => ({
  feedback: one(feedbacks, {
    fields: [votes.feedbackId],
    references: [feedbacks.id],
  }),
}));
