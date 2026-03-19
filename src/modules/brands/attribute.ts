import { serial, text, timestamp } from "drizzle-orm/pg-core";

export const tableName = "brands";

export const attributes = {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  logo: text("logo"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
};
