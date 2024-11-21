import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, lowercase: true, unique: true },
    phoneNumber: { type: String, unique: true },
    password: { type: String },
    resetToken: { type: String },
    resetTokenExpiresAt: { type: Date },
    fraudReport: [{ type: Types.ObjectId, ref: "FraudReport" }],
    apiKey: [{ type: Types.ObjectId, ref: "ApiKey" }],
    isActive: { type: Boolean, default: true }, // Field to indicate account status
    
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(toJSON);

export const UserModel = model("user", userSchema);
