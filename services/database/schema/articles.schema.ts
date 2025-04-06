import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const articles = pgTable("articles", {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  slug: text().notNull().unique(),
  content: text().notNull(),
  summary: text().notNull(),
  cover_image: text(),
  author: text().notNull(),
  category: text().notNull(),
  tags: text().array(),
  read_time: integer().notNull(),
  is_published: boolean().default(false).notNull(),
  published_at: timestamp(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
});

export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;

export default articles;
