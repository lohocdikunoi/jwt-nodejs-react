import express from "express";
import ConfigViewEngine from "./config/viewEngine";
import initWebRoute from "./routers/web";
import bodyParser from "body-parser";
import connection from "./config/connectDB";
import Cors from "./config/configCORs";
import initApiRoute from "./routers/api";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to the database
connection();
//config CORS
Cors(app);
// config view engine
ConfigViewEngine(app);
//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// init web route
initWebRoute(app);
// init api route

initApiRoute(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
