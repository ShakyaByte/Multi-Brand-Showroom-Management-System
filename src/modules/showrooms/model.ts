import { db } from "../../db";
import showroomsSchema from "./schema";
import { eq, ilike, desc, sql, and } from "drizzle-orm";
import Repository from "./repository";

class Model {
  static async create(data: any) {
    const [result] = await db.insert(showroomsSchema).values(data).returning();
    return result;
  }

  static async findAllAndCount(params: any, user: any) {
    const { search, page = 1, limit = 10, brandId } = params;
    const offset = (page - 1) * limit;

    const conditions: any[] = [];
    if (search) {
      conditions.push(ilike(showroomsSchema.name, `%${search}%`));
    }

    // ABAC: Hierarchy-based filtering
    if (user.role === "BRAND_MANAGER" && user.brandId) {
      conditions.push(eq(showroomsSchema.brandId, Number(user.brandId)));
    } else if (user.role === "SHOWROOM_MANAGER" && user.showroomId) {
      conditions.push(eq(showroomsSchema.id, Number(user.showroomId)));
    } else if (brandId) {
      // For SUPER_ADMIN allowing search by brandId from params
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

  static async findById(id: number, user?: any) {
    const conditions = [eq(showroomsSchema.id, id)];

    // ABAC: Ensure user only finds authorized showrooms
    if (user) {
      if (user.role === "BRAND_MANAGER" && user.brandId) {
        conditions.push(eq(showroomsSchema.brandId, Number(user.brandId)));
      } else if (user.role === "SHOWROOM_MANAGER" && user.showroomId) {
        conditions.push(eq(showroomsSchema.id, Number(user.showroomId)));
      }
    }

    const [result] = await db
      .select(Repository.selectQuery)
      .from(showroomsSchema)
      .where(and(...conditions));
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
