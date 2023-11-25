import { Schema, model } from "mongoose";
import { department, role } from "./user.constant.js";

const userSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minLength: [3, "Name is too short"],
      maxLength: [32, "Name is too long"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required"],
      match: [/\S+@\S+\.\S+/, "Email already taken"],
    },
    employeeId: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Employee ID number is required"],
      minLength: [3, "Too small to be true"],
      maxLength: [24, "Too long to be true"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Too Small to be secure"],
    },
    role: {
      type: String,
      enum: {
        values: role,
        message: "{VALUE} is not matched",
      },
      required: [true, "Role is required"],
    },
    department: {
      type: String,
      enum: {
        values: department,
        message: "{VALUE} is not matched",
      },
      required: [true, "department is required"],
    },
    isAdmin: {
      type: Boolean,
      required: [true, "admin role is required"],
    },
    knowledgeAccesses: {
      type: Array,
      default: [],
    },
    profileImage: {
      type: String,
      required: [true, "Profile image is required"],
    },
    cloudinaryId: {
      type: String,
      required: [true, "cloudinaryId image is required"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const User = model("User", userSchema);

export default User;
