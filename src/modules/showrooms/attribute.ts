import { serial, text, integer, real, timestamp } from "drizzle-orm/pg-core";
import brandsSchema from "../brands/schema";

export const tableName = "showrooms";

export const attributes = {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  brandId: integer("brand_id").notNull().references(() => brandsSchema.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
};

