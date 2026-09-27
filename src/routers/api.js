import express from "express";
import apiController from "../controller/apiController";
import usersController from "../controller/usersController";
import groupsController from "../controller/groupsController";

const router = express.Router();

/**
 *
 * @param {*} app : express app
 * @returns
 */
const initApiRoute = (app) => {
  router.get("/test", apiController.TestApi);

  // auth routes
  router.post("/register", apiController.HandleRegister);
  router.post("/login", apiController.HandleLogin);

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
