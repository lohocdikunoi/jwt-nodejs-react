import express from "express";

const router = express.Router();

/**
 *
 * @param {*} app : express app
 * @returns
 */
const initWebRoute = (app) => {
  router.get("/", (req, res) => {
    res.send("Hello world");
  });

  return app.use("/", router);
};

export default initWebRoute;
