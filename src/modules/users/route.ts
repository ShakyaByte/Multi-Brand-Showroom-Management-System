import type { IRoute } from "../../interface";
import { controller } from "./controller";
import { upload } from "../../utils/multer";

// Define once, reuse everywhere
const documentUpload = upload.fields([
  { name: "documentFront", maxCount: 1 },
  { name: "documentBack", maxCount: 1 },
]);

const routes: IRoute[] = [
  {
    method: "post",
    path: "users",
    controller: controller.create,
    middlewares: [documentUpload],
    authorization: true,
    authCheckType: ["SUPER_ADMIN"],
  },
  {
    method: "get",
    path: "users",
    controller: controller.list,
    authorization: true,
    authCheckType: ["SUPER_ADMIN"],
    middlewares: [documentUpload],
  },
  {
    method: "get",
    path: "users/:id",
    controller: controller.find,
    authorization: true,
    authCheckType: ["SUPER_ADMIN"],
    middlewares: [documentUpload],
  },
  {
    method: "patch",
    path: "users/:id",
    controller: controller.update,
    middlewares: [documentUpload],  // reuse same instance
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