import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { usersRouter } from "./routes/usersRouter";

const app: Application = express();
const port = 4112;

mongoose.connect("mongodb://localhost:27017/generator");

app.use(cors());
app.use(express.json());
app.use(usersRouter);

app.listen(port, () => {
  console.log("server listening on port " + port);
});
