import { pgTable } from "drizzle-orm/pg-core";
import { attributes, tableName } from "./attribute";

const schema = pgTable(tableName, attributes);

export default schema;