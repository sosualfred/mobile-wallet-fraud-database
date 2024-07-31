import { FraudReportModel } from "../models/fraudReport_model.js";
import { UserModel } from "../models/user_model.js";
import { fraudReportSchema } from "../schema/fraudReport_schema.js";

export const addFraudReport = async (req, res, next) => {
  const { error, value } = fraudReportSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const id = req.session?.user?.id || req?.user?.id;

  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(404).send("User not found");
  }

  const newReport = await FraudReportModel.create({
    ...value,
    user: id,
  });

  user.fraudReport.push(newReport._id);

  await user.save();

  res.status(201).json({
    message: "Your fraud report has been successfully submitted.",
  });
};
