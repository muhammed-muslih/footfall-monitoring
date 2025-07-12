import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import connectDb from "./config/db.js";
import AppError from "./utils/appError.js";
import errorHandler from "./middlewares/errorHandler.js";
import sensorRoutes from "./routes/sensorRoutes.js";
import startSensorSimulation from "./utils/simulator.js";
dotenv.config();

const server = express();
server.use(express.json());
server.use(morgan("dev"));
server.use(cors());

connectDb();
server.use("/api", sensorRoutes);

startSensorSimulation()

// Catch all unmatched routes
server.use((req, res, next) => {
  next(new AppError("Not Found", 404));
});
server.use(errorHandler);

//server connection
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`.bgCyan);
});
