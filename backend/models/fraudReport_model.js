import { model, Schema, Types } from "mongoose";

const fraudReportSchema = new Schema(
  {
    reporterFirstName: { type: String, required: true },
    reporterLastName: { type: String, required: true },
    reporterEmail: { type: String, required: true },
    reporterPhoneNumber: { type: String, required: true },
    fraudPhoneNumber: { type: String, required: true },
    mobileMoneyProvider: {
      type: String,
      enum: ["mtn", "vodafone", "airtel-tigo"],
      required: true,
    },
    fraudFirstName: { type: String },
    fraudLastName: { type: String },
    dateReported: { type: Date, default: Date.now },
    dateOfIncidence: { type: Date },
    status: {
      type: String,
      enum: ["private", "public"],
      default: "private",
    },
    fraudDescription: { type: String, maxlength: 500 },
    fraudImage: { type: String },
    fraudEvidence: { type: String },
    user: { type: Types.ObjectId, ref: "user" },
    reporters:[{ type: Types.ObjectId, ref: "user" }],
    votes: { type: Number, default: 0}
  },
  {
    timestamps: true,
  }
);

export const FraudReportModel = model("FraudReport", fraudReportSchema);
