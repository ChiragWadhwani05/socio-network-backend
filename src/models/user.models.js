import { Schema, model } from "mongoose";
import {
  AvailableUserRoles,
  UserRoleEnum,
  AvailableUserLogins,
  UserLoginEnum,
} from "../constants.js";

const userSchema = new Schema(
  {
    avatar: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRoleEnum.USER,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    loginType: {
      type: String,
      enum: AvailableUserLogins,
      default: UserLoginEnum.EMAIL_PASSWORD,
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export { User };
