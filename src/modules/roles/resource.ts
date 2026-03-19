import type { IRole } from "./interface";

class Resource {
  static toJson(data: IRole) {
    return {
      id: data.id,
      name: data.name,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
  static collection(data: IRole[]) {
    return data.map((item) => this.toJson(item));
  }
}

export default Resource;
