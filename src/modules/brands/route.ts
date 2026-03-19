import type { IRoute } from "../../interface";
import { controller } from "./controller";

const routes: IRoute[] = [
  {
    method: "post",
    path: "brands",
    controller: controller.create,
  },
  {
    method: "get",
    path: "brands",
    controller: controller.list,
  },
  {
    method: "get",
    path: "brands/:id",
    controller: controller.find,
  },
  {
    method: "patch",
    path: "brands/:id",
    controller: controller.update,
  },
  {
    method: "delete",
    path: "brands/:id",
    controller: controller.delete,
  },
];

export default routes;
