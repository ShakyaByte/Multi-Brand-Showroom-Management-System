import { db } from "../../db";
import showroomsSchema from "./schema";
import { eq, ilike, desc, sql, and } from "drizzle-orm";
import Repository from "./repository";

class Model {
  static async create(data: any) {
    const [result] = await db.insert(showroomsSchema).values(data).returning();
    return result;
  }

  static async findAllAndCount(params: any) {
    const { search, page = 1, limit = 10, brandId } = params;
    const offset = (page - 1) * limit;

    const conditions: any[] = [];
    if (search) {
      conditions.push(ilike(showroomsSchema.name, `%${search}%`));
    }
    if (brandId) {
      conditions.push(eq(showroomsSchema.brandId, Number(brandId)));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const result = await db
      .select(Repository.selectQuery)
      .from(showroomsSchema)
      .where(whereClause)
      .orderBy(desc(showroomsSchema.createdAt))
      .limit(limit)
      .offset(offset);

    const [{ count }]: any = await db
      .select({ count: sql<number>`count(*)` })
      .from(showroomsSchema)
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
      .from(showroomsSchema)
      .where(eq(showroomsSchema.id, id));
    return result;
  }

  static async update(id: number, data: any) {
    const [result] = await db
      .update(showroomsSchema)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(showroomsSchema.id, id))
      .returning();
    return result;
  }

  static async delete(id: number) {
    const [result] = await db
      .delete(showroomsSchema)
      .where(eq(showroomsSchema.id, id))
      .returning();
    return result;
  }
}

export default Model;
