import type { IRoute } from "../../interface";
import { controller } from "./controller";

const routes: IRoute[] = [
  {
    method: "post",
    path: "roles",
    controller: controller.create,
  },
  {
    method: "get",
    path: "roles",
    controller: controller.list,
  },
  {
    method: "get",
    path: "roles/:id",
    controller: controller.find,
  },
  {
    method: "patch",
    path: "roles/:id",
    controller: controller.update,
  },
  {
    method: "delete",
    path: "roles/:id",
    controller: controller.delete,
  },
];

export default routes;
