import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import MatchRoute from "./routes/match.route";

const app = express();

app.use(
  fileUpload({
    createParentPath: true,
  }),
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(MatchRoute);

app.listen(3000, () => {
  console.log("The application is listening on port 3000!");
});
