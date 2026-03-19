import { serial, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

export const tableName = "users";

export const attributes = {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  roleId: integer("role_id").notNull(),   // FK -> roles.id
  brandId: integer("brand_id"),           // FK -> brands.id (nullable for super admin)
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
};
