import showroomsSchema from "./schema";

const selectQuery = {
  id: showroomsSchema.id,
  name: showroomsSchema.name,
  address: showroomsSchema.address,
  latitude: showroomsSchema.latitude,
  longitude: showroomsSchema.longitude,
  brandId: showroomsSchema.brandId,
  createdAt: showroomsSchema.createdAt,
  updatedAt: showroomsSchema.updatedAt,
};

export default { selectQuery };
