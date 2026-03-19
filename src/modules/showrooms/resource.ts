import type { IShowroom } from "./interface";

class Resource {
  static toJson(data: IShowroom) {
    return {
      id: data.id,
      name: data.name,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      brandId: data.brandId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
  static collection(data: IShowroom[]) {
    return data.map((item) => this.toJson(item));
  }
}

export default Resource;
