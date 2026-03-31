import { pgTable, index } from "drizzle-orm/pg-core";
import { attributes, tableName } from "./attribute";

const schema = pgTable(tableName, attributes, (table) => ({
  roleIdIdx: index("users_role_id_idx").on(table.roleId),
  brandIdIdx: index("users_brand_id_idx").on(table.brandId),
  showroomIdIdx: index("users_showroom_id_idx").on(table.showroomId),
  isActiveIdx: index("users_is_active_idx").on(table.isActive),
}));

export default schema;
