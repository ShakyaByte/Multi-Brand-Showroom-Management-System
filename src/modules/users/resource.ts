import type { IUser } from "./interface";

class Resource {
  static toJson(data: IUser) {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      roleId: data.roleId,
      brandId: data.brandId,
      isActive: data.isActive,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
  static collection(data: IUser[]) {
    return data.map((item) => this.toJson(item));
  }
}

export default Resource;
