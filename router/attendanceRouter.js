import express from "express";
import { updateDoctorAttendance, markPresent, getAllAttendance } from "../controller/attendanceController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAllAttendance);
router.put("/update", isAdminAuthenticated, updateDoctorAttendance);
router.post("/mark-present", isAdminAuthenticated, markPresent);

export default router;
