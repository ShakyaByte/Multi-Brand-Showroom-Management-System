import type { IRoute } from "../../interface";
import { controller } from "./controller";
import { authLimiter } from "../../config/rateLimit";

const routes: IRoute[] = [
  {
    method: "post",
    path: "auth/register",
    controller: controller.register,
    rateLimit: authLimiter,
  },
  {
    method: "post",
    path: "auth/login",
    controller: controller.login,
    rateLimit: authLimiter,
  },
  {
    method: "post",
    path: "auth/forgot-password",
    controller: controller.forgotPassword,
    rateLimit: authLimiter,
  },
  {
    method: "post",
    path: "auth/reset-password",
    controller: controller.resetPassword,
    rateLimit: authLimiter,
  },
];

export default routes;

