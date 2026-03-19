import brandsSchema from "./schema";

const selectQuery = {
  id: brandsSchema.id,
  name: brandsSchema.name,
  logo: brandsSchema.logo,
  createdAt: brandsSchema.createdAt,
  updatedAt: brandsSchema.updatedAt,
};

export default { selectQuery };
