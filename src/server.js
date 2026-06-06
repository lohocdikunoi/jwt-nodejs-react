import express from "express";
import ConfigViewEngine from "./configs/viewEngine";
import initWebRoute from "./routers/web";
import bodyParser from "body-parser";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

// config view engine
ConfigViewEngine(app);
//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// init web route
initWebRoute(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
