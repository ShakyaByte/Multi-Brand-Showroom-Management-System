import { db } from "../../db";
import brandsSchema from "./schema";
import { eq, ilike, desc, sql, and } from "drizzle-orm";
import Repository from "./repository";

class Model {
  static async create(data: any) {
    const [result] = await db.insert(brandsSchema).values(data).returning();
    return result;
  }

  static async findAllAndCount(params: any) {
    const { search, page = 1, limit = 10 } = params;
    const offset = (page - 1) * limit;

    const conditions: any[] = [];
    if (search) {
      conditions.push(ilike(brandsSchema.name, `%${search}%`));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const result = await db
      .select(Repository.selectQuery)
      .from(brandsSchema)
      .where(whereClause)
      .orderBy(desc(brandsSchema.createdAt))
      .limit(limit)
      .offset(offset);

    const [{ count }]: any = await db
      .select({ count: sql<number>`count(*)` })
      .from(brandsSchema)
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
      .from(brandsSchema)
      .where(eq(brandsSchema.id, id));
    return result;
  }

  static async findByName(name: string) {
    const [result] = await db
      .select()
      .from(brandsSchema)
      .where(eq(brandsSchema.name, name));
    return result;
  }

  static async update(id: number, data: any) {
    const [result] = await db
      .update(brandsSchema)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(brandsSchema.id, id))
      .returning();
    return result;
  }

  static async delete(id: number) {
    const [result] = await db
      .delete(brandsSchema)
      .where(eq(brandsSchema.id, id))
      .returning();
    return result;
  }
}

export default Model;
