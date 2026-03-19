import bikesSchema from "./schema";

const selectQuery = {
  id: bikesSchema.id,
  name: bikesSchema.name,
  price: bikesSchema.price,
  specs: bikesSchema.specs,
  brandId: bikesSchema.brandId,
  createdAt: bikesSchema.createdAt,
  updatedAt: bikesSchema.updatedAt,
};

export default { selectQuery };
