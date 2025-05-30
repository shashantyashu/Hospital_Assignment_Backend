import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [1, "First Name Must Contain At Least 3 Characters!"],
    },
    lastName: {
      type: String,
      required: true,
      minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Provide A Valid Email!"],
    },
    phone: {
      type: String,
      required: true,
      minLength: [8, "Phone Number Must Contain Exact 11 Digits!"],
      maxLength: [10, "Phone Number Must Contain Exact 11 Digits!"],
    },
    message: {
      type: String,
      required: true,
      minLength: [2, "Message Must Contain At Least 10 Characters!"],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // ✅ Adds createdAt and updatedAt fields
  }
);

export const Message = mongoose.model("Message", messageSchema);
