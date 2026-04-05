import { serial, text, integer, timestamp, boolean, varchar } from "drizzle-orm/pg-core";
import rolesSchema from "../roles/schema";
import brandsSchema from "../brands/schema";
import showroomsSchema from "../showrooms/schema";

export const tableName = "users";

export const attributes = {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  documentType: text("document_type").notNull(),
  documentNumber: text("document_number").notNull(),
  documentFront: text("document_front_path").notNull(),
  documentBack: text("document_back_path").notNull(),
  roleId: integer("role_id").notNull().references(() => rolesSchema.id),
  brandId: integer("brand_id").references(() => brandsSchema.id),
  showroomId: integer("showroom_id").references(() => showroomsSchema.id),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  otp: varchar("otp", { length: 6 }),           // ← add
  otpExpiry: timestamp("otp_expiry"),            // ← add
};