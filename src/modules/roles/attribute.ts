import { serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const tableName = "roles";

export const attributes = {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(), // SUPER_ADMIN, BRAND_MANAGER, SHOWROOM_MANAGER
  permissions: jsonb("permissions").notNull().default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
};
