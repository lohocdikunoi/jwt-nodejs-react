import express from "express";
import apiController from "../controller/apiController";
import usersController from "../controller/usersController";
import groupsController from "../controller/groupsController";
import roleController from "../controller/roleController";
import {
  checkUserJwtWithCookie,
  checkUserPermission,
} from "../middleware/JWTAction";

const router = express.Router();

/**
 *
 * @param {*} app : express app
 * @returns
 */
const initApiRoute = (app) => {
  router.all("*", checkUserJwtWithCookie, checkUserPermission);

  // auth routes
  router.post("/register", apiController.HandleRegister);
  router.post("/login", apiController.HandleLogin);
  router.post("/logout", apiController.HandleLogout);
  // account route
  router.get("/account", usersController.getUserAccount);

  //role route
  router.get("/roles/read", roleController.readFunc);
  router.post("/roles/create", roleController.createFunc);
  router.put("roles/update", roleController.updateFunc);
  router.delete("/roles/delete", roleController.deleteFunc);
  router.get("/roles/by-groups/:groupsId", roleController.getRoleByGroup);
  router.post("/roles/assignRoleToGroup", roleController.assignRoleToGroup);

  // users routes
  router.get("/users/read", usersController.readFunc);
  router.post("/users/create", usersController.createFunc);
  router.put("/users/update", usersController.updateFunc);
  router.delete("/users/delete", usersController.deleteFunc);

  //group routes
  router.get("/groups/read", groupsController.readGroupFunc);

  return app.use("/api/v1", router);
};

export default initApiRoute;
