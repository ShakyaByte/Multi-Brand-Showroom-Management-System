import { db } from "../../db";
import rolesSchema from "./schema";
import { eq, ilike, desc, sql, and } from "drizzle-orm";
import Repository from "./repository";

class Model {
  static async create(data: any) {
    const [result] = await db.insert(rolesSchema).values(data).returning();
    return result;
  }

  static async findAllAndCount(params: any) {
    const { search, page = 1, limit = 10 } = params;
    const offset = (page - 1) * limit;

    const conditions: any[] = [];
    if (search) {
      conditions.push(ilike(rolesSchema.name, `%${search}%`));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const result = await db
      .select(Repository.selectQuery)
      .from(rolesSchema)
      .where(whereClause)
      .orderBy(desc(rolesSchema.createdAt))
      .limit(limit)
      .offset(offset);

    const [{ count }]: any = await db
      .select({ count: sql<number>`count(*)` })
      .from(rolesSchema)
      .where(whereClause);

    return {
      items: result,
      page: Number(page),
      totalItems: Number(count),
      totalPages: Math.ceil(Number(count) / limit),
    };
  }

  static async findById(id: number) {
    const [result] = await db
      .select(Repository.selectQuery)
      .from(rolesSchema)
      .where(eq(rolesSchema.id, id));
    return result;
  }

  static async findByName(name: string) {
    const [result] = await db
      .select()
      .from(rolesSchema)
      .where(eq(rolesSchema.name, name));
    return result;
  }

  static async update(id: number, data: any) {
    const [result] = await db
      .update(rolesSchema)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(rolesSchema.id, id))
      .returning();
    return result;
  }

  static async delete(id: number) {
    const [result] = await db
      .delete(rolesSchema)
      .where(eq(rolesSchema.id, id))
      .returning();
    return result;
  }
}

export default Model;
