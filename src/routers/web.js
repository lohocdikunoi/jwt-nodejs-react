import express from "express";
import homeController from "../controller/homeController";

const router = express.Router();

/**
 *
 * @param {*} app : express app
 * @returns
 */
const initWebRoute = (app) => {
  router.get("/", homeController.homePage);
  router.get("/user", homeController.userPage);
  router.get("/users/edit/:id", homeController.getPageUpdateUser);

  router.post("/users/create", homeController.HandleCreateUser);
  router.post("/users/delete/:id", homeController.HandleDeleteUser);
  router.post("/users/update-user", homeController.HandleUpdateUser);

  return app.use("/", router);
};

export default initWebRoute;
