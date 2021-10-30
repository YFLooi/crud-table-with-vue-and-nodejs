const express = require("express");
import { Request, Response } from "express";
import _ from "lodash";
import cors from "cors";
import CustomerRouter from "./customer/customer.route";
import { mongooseConnect } from "./server.config";
require("dotenv").config();

const server = express();
const port = 5000;

// Initiates connection to db
mongooseConnect();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// Error handler
server.use(function (
  err: { status: any; message: any },
  req: any,
  res: Response,
  next: any
) {
  return res.status(err.status || 500).json({ errMsg: err.message });
});

server.use("/customer", CustomerRouter);

server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
