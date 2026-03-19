import type { IRoute } from "../../interface";
import { controller } from "./controller";

const routes: IRoute[] = [
  {
    method: "post",
    path: "auth/register",
    controller: controller.register,
  },
  {
    method: "post",
    path: "auth/login",
    controller: controller.login,
  },
];

export default routes;
