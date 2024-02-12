import dbConnect from "./db/index.js";
import express from "express";
import cors from "cors";
import rootRouter from "./api/index.js";
// import cookieParser from "cookie-parser";

const app = express();

import cookieParser from "cookie-parser";
app.use(cookieParser());

// const cookie = cookieParser();
// app.use(cookie());
app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);
dbConnect()
  .then(() =>
    app.listen(3000, () => console.log("the app is listening at port 3000")),
  )
  .catch((err) =>
    console.log("the error occured while listening to the port ", err),
  );
