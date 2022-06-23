import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import MatchRoute from "./routes/match.route";
import { LoggerStream } from "./helpers/logger.helper";

const app = express();

app.use(
  fileUpload({
    createParentPath: true,
  }),
);
app.use(morgan("combined", { stream: LoggerStream }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(MatchRoute);

app.listen(3000, () => {
  console.log("The application is listening on port 3000!");
});
