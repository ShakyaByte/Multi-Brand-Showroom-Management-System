import { pgTable, index } from "drizzle-orm/pg-core";
import { attributes, tableName } from "./attribute";

const schema = pgTable(tableName, attributes, (table) => ({
  brandIdIdx: index("bikes_brand_id_idx").on(table.brandId),
  nameIdx: index("bikes_name_idx").on(table.name),
}));

export default schema;
