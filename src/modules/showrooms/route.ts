import type { IRoute } from "../../interface";
import { controller } from "./controller";

const routes: IRoute[] = [
  {
    method: "post",
    path: "showrooms",
    controller: controller.create,
    authorization: true,
    authCheckType: ["SUPER_ADMIN", "SHOWROOM_MANAGER"],
  },
  {
    method: "get",
    path: "showrooms",
    controller: controller.list,
    authorization: true,
    authCheckType: ["SUPER_ADMIN", "BRAND_MANAGER", "SHOWROOM_MANAGER"],
  },
  {
    method: "get",
    path: "showrooms/:id",
    controller: controller.find,
    authorization: true,
    authCheckType: ["SUPER_ADMIN", "BRAND_MANAGER", "SHOWROOM_MANAGER"],
  },
  {
    method: "patch",
    path: "showrooms/:id",
    controller: controller.update,
    authorization: true,
    authCheckType: ["SUPER_ADMIN", "SHOWROOM_MANAGER"],
  },
  {
    method: "delete",
    path: "showrooms/:id",
    controller: controller.delete,
    authorization: true,
    authCheckType: ["SUPER_ADMIN"],
  },
];

export default routes;
