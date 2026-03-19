import { db } from "../../db";
import usersSchema from "./schema";
import { eq, ilike, or, desc, sql, and } from "drizzle-orm";
import Repository from "./repository";

class Model {
  static async create(data: any) {
    const [result] = await db.insert(usersSchema).values(data).returning();
    return result;
  }

  static async findAllAndCount(params: any) {
    const { search, page = 1, limit = 10, brandId } = params;
    const offset = (page - 1) * limit;

    const conditions: any[] = [];
    if (search) {
      conditions.push(
        or(
          ilike(usersSchema.name, `%${search}%`),
          ilike(usersSchema.email, `%${search}%`)
        )
      );
    }
    if (brandId) {
      conditions.push(eq(usersSchema.brandId, Number(brandId)));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const result = await db
      .select(Repository.selectQuery)
      .from(usersSchema)
      .where(whereClause)
      .orderBy(desc(usersSchema.createdAt))
      .limit(limit)
      .offset(offset);

    const [{ count }]: any = await db
      .select({ count: sql<number>`count(*)` })
      .from(usersSchema)
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
      .from(usersSchema)
      .where(eq(usersSchema.id, id));
    return result;
  }

  static async findByEmail(email: string) {
    const [result] = await db
      .select()
      .from(usersSchema)
      .where(eq(usersSchema.email, email));
    return result;
  }

  static async update(id: number, data: any) {
    const [result] = await db
      .update(usersSchema)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(usersSchema.id, id))
      .returning();
    return result;
  }

  static async delete(id: number) {
    const [result] = await db
      .delete(usersSchema)
      .where(eq(usersSchema.id, id))
      .returning();
    return result;
  }
}

export default Model;
