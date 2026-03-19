import rolesSchema from "./schema";

const selectQuery = {
  id: rolesSchema.id,
  name: rolesSchema.name,
  createdAt: rolesSchema.createdAt,
  updatedAt: rolesSchema.updatedAt,
};

export default { selectQuery };
