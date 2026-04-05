import usersSchema from "./schema";

const selectQuery = {
  id: usersSchema.id,
  name: usersSchema.name,
  email: usersSchema.email,
  roleId: usersSchema.roleId,
  brandId: usersSchema.brandId,
  showroomId: usersSchema.showroomId,
  documentType: usersSchema.documentType,
  documentNumber: usersSchema.documentNumber,
  documentFront: usersSchema.documentFront,
  documentBack: usersSchema.documentBack,
  isActive: usersSchema.isActive,
  createdAt: usersSchema.createdAt,
  updatedAt: usersSchema.updatedAt,
};

export default { selectQuery };
