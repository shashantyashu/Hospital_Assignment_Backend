import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

// Middleware to authenticate dashboard users
// export const isAdminAuthenticated = catchAsyncErrors(
//   async (req, res, next) => {
//     const token = req.cookies.adminToken;
//     if (!token) {
//       return next(
//         new ErrorHandler("Dashboard User is not authenticated!", 400)
//       );
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = await User.findById(decoded.id);
//     if (req.user.role !== "Admin") {
//       return next(
//         new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
//       );
//     }
//     next();
//   }
// );

export const isAdminAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    const adminToken = req.cookies.adminToken;
    const doctorToken = req.cookies.doctorToken;

    let token, expectedRole;

    if (adminToken) {
      token = adminToken;
      expectedRole = "Admin";
    } else if (doctorToken) {
      token = doctorToken;
      expectedRole = "Doctor";
    } else {
      return next(
        new ErrorHandler("Admin or Doctor is not authenticated!", 400)
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== expectedRole) {
      return next(
        new ErrorHandler(`${user?.role || "User"} not authorized for this resource!`, 403)
      );
    }

    req.user = user; // attach the user to req for further use
    next();
  }
);

// Middleware to authenticate frontend users
export const isPatientAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
      return next(new ErrorHandler("User is not authenticated!", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Patient") {
      return next(
        new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
      );
    }
    next();
  }
);

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to access this resource!`
        )
      );
    }
    next();
  };
};
