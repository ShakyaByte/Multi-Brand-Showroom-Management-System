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
  {
    method: "post",
    path: "auth/forgot-password",
    controller: controller.forgotPassword,
  },
  {
    method: "post",
    path: "auth/reset-password",
    controller: controller.resetPassword,
  },
];

export default routes;
