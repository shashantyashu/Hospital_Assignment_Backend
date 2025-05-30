import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Attendance } from "../models/Attendance.js";
import { User } from "../models/userSchema.js";

export const updateDoctorAttendance = catchAsyncErrors(
  async (req, res, next) => {
    const { doctorId, month, day, status } = req.body;

    if (!doctorId || !month || !day || !status) {
      return next(
        new ErrorHandler("doctorId, month, day, and status are required.", 400)
      );
    }

    const attendance = await Attendance.findOne({ doctor: doctorId, month });
    if (!attendance) {
      return next(
        new ErrorHandler(
          "Attendance record not found for this doctor and month.",
          404
        )
      );
    }

    const existingDay = attendance.days.find((d) => d.day === day);

    if (existingDay) {
      existingDay.status = status;
    } else {
      attendance.days.push({ day, status });
    }

    await attendance.save();

    res.status(200).json({
      success: true,
      message: "Attendance updated successfully.",
      updatedAttendance: attendance.days,
    });
  }
);

export const markPresent = async (req, res) => {
  try {
    const doctorId = req.user._id;
    const today = new Date();
    const monthName = today.toLocaleString("default", { month: "long" });
    const day = String(today.getDate());

    let attendanceDoc = await Attendance.findOne({
      doctor: doctorId,
      month: monthName,
    });

    if (!attendanceDoc) {
      attendanceDoc = await Attendance.create({
        doctor: doctorId,
        month: monthName,
        days: [{ day, status: "P" }],
      });
    } else {
      const dayEntry = attendanceDoc.days.find((d) => d.day === day);
      if (dayEntry) {
        dayEntry.status = "P";
      } else {
        attendanceDoc.days.push({ day, status: "P" });
      }
      await attendanceDoc.save();
    }

    res.status(200).json({ success: true, message: "Marked present!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllAttendance = async (req, res, next) => {
  try {
    const allAttendance = await Attendance.find()
      .populate("doctor", "firstName lastName") // ✅ populate doctor info
      .exec();

    res.status(200).json(allAttendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
