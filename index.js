import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./src/router/auth.js";
import protectedRoute from "./src/router/protectedRoute.js";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/protected", protectedRoute);

// mongoose conncetion with mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/jwtapp")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
