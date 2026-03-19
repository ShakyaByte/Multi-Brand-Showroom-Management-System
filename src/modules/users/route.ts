import type { IRoute } from "../../interface";
import { controller } from "./controller";

const routes: IRoute[] = [
  {
    method: "post",
    path: "users",
    controller: controller.create,
  },
  {
    method: "get",
    path: "users",
    controller: controller.list,
  },
  {
    method: "get",
    path: "users/:id",
    controller: controller.find,
  },
  {
    method: "patch",
    path: "users/:id",
    controller: controller.update,
  },
  {
    method: "delete",
    path: "users/:id",
    controller: controller.delete,
  },
];

export default routes;
