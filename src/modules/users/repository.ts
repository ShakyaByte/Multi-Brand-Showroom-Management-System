import usersSchema from "./schema";

const selectQuery = {
  id: usersSchema.id,
  name: usersSchema.name,
  email: usersSchema.email,
  roleId: usersSchema.roleId,
  brandId: usersSchema.brandId,
  showroomId: usersSchema.showroomId,
  isActive: usersSchema.isActive,
  createdAt: usersSchema.createdAt,
  updatedAt: usersSchema.updatedAt,
};

export default { selectQuery };
