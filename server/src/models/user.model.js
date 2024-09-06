import { Schema, model } from "mongoose";

const UserSchema = Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
      lowercase: true,
      trime: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);
export const User = model("User", UserSchema);
