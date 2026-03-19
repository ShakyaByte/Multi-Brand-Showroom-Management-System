import { serial, text, integer, real, json, timestamp } from "drizzle-orm/pg-core";

export const tableName = "bikes";

export const attributes = {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: real("price").notNull(),
  specs: json("specs"),               // JSON field for flexible specifications
  brandId: integer("brand_id").notNull(), // FK -> brands.id
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
};
