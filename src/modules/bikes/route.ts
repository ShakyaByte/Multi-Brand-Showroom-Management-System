import type { IRoute } from "../../interface";
import { controller } from "./controller";

const routes: IRoute[] = [
  {
    method: "post",
    path: "bikes",
    controller: controller.create,
  },
  {
    method: "get",
    path: "bikes",
    controller: controller.list,
  },
  {
    method: "get",
    path: "bikes/:id",
    controller: controller.find,
  },
  {
    method: "patch",
    path: "bikes/:id",
    controller: controller.update,
  },
  {
    method: "delete",
    path: "bikes/:id",
    controller: controller.delete,
  },
];

export default routes;
