import type { IRoute } from "../../interface";
import { controller } from "./controller";

const routes: IRoute[] = [
  {
    method: "post",
    path: "brands",
    controller: controller.create,
    authorization: true,
    authCheckType: ["SUPER_ADMIN"],
  },
  {
    method: "get",
    path: "brands",
    controller: controller.list,
    authorization: true,
    authCheckType: ["SUPER_ADMIN", "BRAND_MANAGER", "SHOWROOM_MANAGER"],
  },
  {
    method: "get",
    path: "brands/:id",
    controller: controller.find,
    authorization: true,
    authCheckType: ["SUPER_ADMIN", "BRAND_MANAGER", "SHOWROOM_MANAGER"],
  },
  {
    method: "patch",
    path: "brands/:id",
    controller: controller.update,
    authorization: true,
    authCheckType: ["SUPER_ADMIN"],
  },
  {
    method: "delete",
    path: "brands/:id",
    controller: controller.delete,
    authorization: true,
    authCheckType: ["SUPER_ADMIN"],
  },
];

export default routes;
