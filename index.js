import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DBConnection Successfull!"))
  .catch((error) => console.log(error));

const app = express();

app.listen(process.env.PORT || 4200, () => {
  console.log(`Backend server is running on PORT ${process.env.PORT}`);
});
