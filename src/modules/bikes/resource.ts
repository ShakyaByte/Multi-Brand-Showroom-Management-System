import type { IBike } from "./interface";

class Resource {
  static toJson(data: IBike) {
    return {
      id: data.id,
      name: data.name,
      price: data.price,
      specs: data.specs,
      brandId: data.brandId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
  static collection(data: IBike[]) {
    return data.map((item) => this.toJson(item));
  }
}

export default Resource;
