// models/Attendance.js
import mongoose from "mongoose";

const daySchema = new mongoose.Schema({
  day: String,
  status: { type: String, enum: ["P", "A"], default: "A" },
});

const attendanceSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  month: String,
  days: [daySchema],
});

export const Attendance = mongoose.model("Attendance", attendanceSchema);
