import mongoose from "mongoose";
import { config } from "dotenv";
import { startAttendanceCron } from "../cronJobs/attendance.js"; // import the cron logic

config({ path: "./config.env" });

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM",
    })
    .then(() => {
      console.log("Connected to database!");
      startAttendanceCron(); // Start cron after DB is connected
    })
    .catch((err) => {
      console.log("Some error occured while connecting to database:", err);
    });
};
