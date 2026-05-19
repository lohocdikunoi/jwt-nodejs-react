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

  return app.use("/", router);
};

export default initWebRoute;
