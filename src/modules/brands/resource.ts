import type { IBrand } from "./interface";

class Resource {
  static toJson(data: IBrand) {
    return {
      id: data.id,
      name: data.name,
      logo: data.logo,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
  static collection(data: IBrand[]) {
    return data.map((item) => this.toJson(item));
  }
}

export default Resource;
