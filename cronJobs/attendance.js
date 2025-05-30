import cron from "node-cron";
import { Attendance }  from "../models/Attendance.js";
import {User} from "../models/userSchema.js"; // Assuming this contains doctor data

export const startAttendanceCron = () => {
  cron.schedule("0 0 * * *", async () => {
    const today = new Date();
    const monthName = today.toLocaleString("default", { month: "long" });
    const day = String(today.getDate());

    console.log(`⏰ Running Attendance Cron for ${monthName} ${day}`);

    try {
      const doctors = await User.find({ role: "Doctor" });

      for (const doctor of doctors) {
        let attendanceDoc = await Attendance.findOne({
          doctor: doctor._id,
          month: monthName,
        });

        if (!attendanceDoc) {
          attendanceDoc = await Attendance.create({
            doctor: doctor._id,
            month: monthName,
            days: [{ day, status: "A" }],
          });
        } else {
          const existingDay = attendanceDoc.days.find((d) => d.day === day);
          if (!existingDay) {
            attendanceDoc.days.push({ day, status: "A" });
            await attendanceDoc.save();
          }
        }
      }

      console.log("✅ Attendance marked as Absent by default.");
    } catch (err) {
      console.error("❌ Cron Error:", err.message);
    }
  });
};
