import type { IRoute } from "../../interface";
import { controller } from "./controller";

const routes: IRoute[] = [
  {
    method: "post",
    path: "showrooms",
    controller: controller.create,
  },
  {
    method: "get",
    path: "showrooms",
    controller: controller.list,
  },
  {
    method: "get",
    path: "showrooms/:id",
    controller: controller.find,
  },
  {
    method: "patch",
    path: "showrooms/:id",
    controller: controller.update,
  },
  {
    method: "delete",
    path: "showrooms/:id",
    controller: controller.delete,
  },
];

export default routes;
