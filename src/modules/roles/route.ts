import type { IRoute } from "../../interface";
import { controller } from "./controller";

const routes: IRoute[] = [
  {
    method: "post",
    path: "roles",
    controller: controller.create,
    authorization: true,
    authCheckType: ["SUPER_ADMIN"],
  },
  {
    method: "get",
    path: "roles",
    controller: controller.list,
    authorization: true,
    authCheckType: ["SUPER_ADMIN"],
  },
  {
    method: "get",
    path: "roles/:id",
    controller: controller.find,
    authorization: true,
    authCheckType: ["SUPER_ADMIN"],
  },
  {
    method: "patch",
    path: "roles/:id",
    controller: controller.update,
    authorization: true,
    authCheckType: ["SUPER_ADMIN"],
  },
  {
    method: "delete",
    path: "roles/:id",
    controller: controller.delete,
    authorization: true,
    authCheckType: ["SUPER_ADMIN"],
  },
];

export default routes;
