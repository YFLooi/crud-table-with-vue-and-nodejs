import mongoose from "mongoose";
import { constructMongoConnection } from "./src/server.config";
import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";
import CustomerRouter from "./src/customer.route";

const server = express();
const port = 5000;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Connecting to database
const mongoConnectionString = constructMongoConnection();
mongoose.Promise = global.Promise;

mongoose.connect(mongoConnectionString, {}, function (error) {
  if (error) {
    console.log("Error!" + error);
  } else {
    console.log("Connected to MongoDB Atlas database");
  }
});

server.use("/customer", CustomerRouter);

server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
