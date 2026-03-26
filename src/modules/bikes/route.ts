import type { IRoute } from "../../interface";
import { controller } from "./controller";

const routes: IRoute[] = [
  {
    method: "post",
    path: "bikes",
    controller: controller.create,
    authorization: true,
    authCheckType: ["SUPER_ADMIN", "BRAND_MANAGER"],
  },
  {
    method: "get",
    path: "bikes",
    controller: controller.list,
    authorization: true,
    authCheckType: ["SUPER_ADMIN", "BRAND_MANAGER", "SHOWROOM_MANAGER"],
  },
  {
    method: "get",
    path: "bikes/:id",
    controller: controller.find,
    authorization: true,
    authCheckType: ["SUPER_ADMIN", "BRAND_MANAGER", "SHOWROOM_MANAGER"],
  },
  {
    method: "patch",
    path: "bikes/:id",
    controller: controller.update,
    authorization: true,
    authCheckType: ["SUPER_ADMIN", "BRAND_MANAGER"],
  },
  {
    method: "delete",
    path: "bikes/:id",
    controller: controller.delete,
    authorization: true,
    authCheckType: ["SUPER_ADMIN", "BRAND_MANAGER"],
  },
];

export default routes;
