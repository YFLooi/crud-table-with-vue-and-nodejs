import mongoose from "mongoose";
import express, { Request, Response } from "express";
import { constructMongoConnection } from "./server.config";
import _ from "lodash";
import CustomerRouter from "./customer/customer.route";
import cors from "cors";

const server = express();
const port = 4000;

server.use(cors);
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Connecting to database
const mongoConnectionString = constructMongoConnection();
mongoose.Promise = global.Promise;

mongoose.connect(mongoConnectionString, {}, function (error: any) {
  if (error) {
    console.log("Error!" + error);
  } else {
    console.log("Connected to MongoDB Atlas database");
  }
});

// server.use("/customer", CustomerRouter);
server.get(`/`, async (req: Request, res: Response) => {
  const message = `Request to server received!`;
  console.log(message);

  res.status(200).json({ message: message });
});

server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
