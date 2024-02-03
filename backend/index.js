import dbConnect from "./db/index.js";
import express from "express";
import cors from "cors";
import rootRouter from "./api/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);
dbConnect()
  .then(() =>
    app.listen(3000, () => console.log("the app is listening at port 8000"))
  )
  .catch((err) =>
    console.log("the error occured while listening to the port ", err)
  );
