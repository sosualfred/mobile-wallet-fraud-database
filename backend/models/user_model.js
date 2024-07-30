import { model, Schema } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, lowercase: true, unique: true },
    phoneNumber: { type: String, unique: true },
    password: { type: String },
    resetPassword: {type: String},
    resetToken: {type: String},
    resetTokenExpiresAt: {type: Date}
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(toJSON);

export const UserModel = model("User", userSchema);
