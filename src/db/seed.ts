import { db } from "./index";
import rolesSchema from "../modules/roles/schema";
import usersSchema from "../modules/users/schema";
import { hashPassword } from "../utils/helper";

async function seed() {
  console.log("Seeding Database...");

  // 1. Seed Roles
  const roles = await db.insert(rolesSchema).values([
    { name: "SUPER_ADMIN" },
    { name: "BRAND_ADMIN" },
    { name: "MANAGER" },
  ])
  .onConflictDoNothing()
  .returning();
  
  // If roles were already inserted, we need to fetch them
  let allRoles = roles;
  if (roles.length === 0) {
    allRoles = await db.select().from(rolesSchema);
  }
  
  const superAdminRole = allRoles.find(r => r.name === "SUPER_ADMIN");

  // 2. Seed the first Super Admin User
  const hashedPassword = await hashPassword("admin@123"); 
  await db.insert(usersSchema).values({
    name: "System Admin",
    email: "admin@gmail.com",
    password: hashedPassword,
    roleId: superAdminRole!.id, // Link to SUPER_ADMIN role
    // brandId is left null because Super Admin manages all brands
  }).onConflictDoNothing();

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch(console.error);