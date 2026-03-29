import { db } from "../../db";
import bikesSchema from "./schema";
import { eq, ilike, desc, sql, and, gte, lte } from "drizzle-orm";
import Repository from "./repository";

class Model {
  static async create(data: any) {
    const [result] = await db.insert(bikesSchema).values(data).returning();
    return result;
  }

  static async findAllAndCount(params: any, user: any) {
    const { search, page = 1, limit = 10, brandId, minPrice, maxPrice } = params;
    const offset = (page - 1) * limit;

    const conditions: any[] = [];
    if (search) {
      conditions.push(ilike(bikesSchema.name, `%${search}%`));
    }
    
    // ABAC: If user is not SUPER_ADMIN, force brandId from user context
    if (user.role !== "SUPER_ADMIN" && user.brandId) {
      conditions.push(eq(bikesSchema.brandId, Number(user.brandId)));
    } else if (brandId) {
      // Allow SUPER_ADMIN to filter by brandId from params
      conditions.push(eq(bikesSchema.brandId, Number(brandId)));
    }

    if (minPrice) {
      conditions.push(gte(bikesSchema.price, Number(minPrice)));
    }
    if (maxPrice) {
      conditions.push(lte(bikesSchema.price, Number(maxPrice)));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const result = await db
      .select(Repository.selectQuery)
      .from(bikesSchema)
      .where(whereClause)
      .orderBy(desc(bikesSchema.createdAt))
      .limit(limit)
      .offset(offset);

    const [{ count }]: any = await db
      .select({ count: sql<number>`count(*)` })
      .from(bikesSchema)
      .where(whereClause);

    return {
      items: result,
      page: Number(page),
      totalItems: Number(count),
      totalPages: Math.ceil(Number(count) / limit),
    };
  }

  static async findById(id: number, user?: any) {
    const conditions = [eq(bikesSchema.id, id)];

    // ABAC: If user is provided and not SUPER_ADMIN, ensure they only find bikes of their brand
    if (user && user.role !== "SUPER_ADMIN" && user.brandId) {
      conditions.push(eq(bikesSchema.brandId, Number(user.brandId)));
    }

    const [result] = await db
      .select(Repository.selectQuery)
      .from(bikesSchema)
      .where(and(...conditions));
    return result;
  }

  static async update(id: number, data: any) {
    const [result] = await db
      .update(bikesSchema)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(bikesSchema.id, id))
      .returning();
    return result;
  }

  static async delete(id: number) {
    const [result] = await db
      .delete(bikesSchema)
      .where(eq(bikesSchema.id, id))
      .returning();
    return result;
  }
}

export default Model;
