import rolesSchema from "./schema";

const selectQuery = {
  id: rolesSchema.id,
  name: rolesSchema.name,
  permissions: rolesSchema.permissions,
  createdAt: rolesSchema.createdAt,
  updatedAt: rolesSchema.updatedAt,
};

export default { selectQuery };
