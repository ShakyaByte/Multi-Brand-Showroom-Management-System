import { serial, text, timestamp } from "drizzle-orm/pg-core";

export const tableName = "otps";

export const attributes = {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  otp: text("otp").notNull(),
  purpose: text("purpose").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
};