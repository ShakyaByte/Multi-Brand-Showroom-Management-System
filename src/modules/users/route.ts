import type { IRoute } from "../../interface";
import { controller } from "./controller";

const routes: IRoute[] = [
  {
    method: "post",
    path: "users",
    controller: controller.create,
    authorization: true,
    authCheckType: ["SUPER_ADMIN"],
  },
  {
    method: "get",
    path: "users",
    controller: controller.list,
    authorization: true,
    authCheckType: ["SUPER_ADMIN"],
  },
  {
    method: "get",
    path: "users/:id",
    controller: controller.find,
    authorization: true,
    authCheckType: ["SUPER_ADMIN"],
  },
  {
    method: "patch",
    path: "users/:id",
    controller: controller.update,
    authorization: true,
    authCheckType: ["SUPER_ADMIN"],
  },
  {
    method: "delete",
    path: "users/:id",
    controller: controller.delete,
    authorization: true,
    authCheckType: ["SUPER_ADMIN"],
  },
];

export default routes;
