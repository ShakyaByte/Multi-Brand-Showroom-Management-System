import { serial, text, timestamp } from "drizzle-orm/pg-core";

export const tableName = "roles";

export const attributes = {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(), // SUPER_ADMIN, BRAND_ADMIN, MANAGER
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
};
