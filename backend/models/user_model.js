import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, lowercase: true, unique: true },
    phoneNumber: { type: String, unique: true },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model("User", userSchema);
