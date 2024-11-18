import { FraudReportModel } from "../models/fraudReport_model.js";
import { UserModel } from "../models/user_model.js";
import {
  checkNumberSchema,
  fraudReportQuerySchema,
  fraudReportSchema,
} from "../schema/fraudReport_schema.js";
import mongoose from "mongoose";

export const addFraudReport = async (req, res, next) => {
  try {
    // Prepare the report data, including file uploads
    const reportData = {
      ...req.body,
      mobileMoneyProvider: req.body.mobileMoneyProvider.toLowerCase(),
      fraudImage: req.files?.fraudImage?.[0]?.filename,
      fraudEvidence: req.files?.fraudEvidence?.[0]?.filename,
    };

    // Validate the report data
    const { error, value } = fraudReportSchema.validate(reportData);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Get the user ID from the session or request
    const userId = req.session?.user?.id || req?.user?.id;

    // Find the user
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the new fraud report
    const newReport = await FraudReportModel.create({
      ...value,
      user: userId,
      reporterFirstName: user.firstName,
      reporterLastName: user.lastName,
      reporterEmail: user.email,
      reporterPhoneNumber: user.phoneNumber,
    });

    // Add the report to the user's fraudReport array
    user.fraudReport.push(newReport._id);
    await user.save();

    
    // Send the response
    res.status(201).json({
      message: "Your fraud report has been successfully submitted.",
      report: newReport,
    });
  } catch (error) {
    console.error("Error in addFraudReport:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

// export const addFraudReport = async (req, res, next) => {
//   try {
//     const { error, value } = fraudReportSchema.validate(req.body);
//     if (error) {
//       return res.status(400).send(error.details[0].message);
//     }

//     const id = req.session?.user?.id || req?.user?.id;

//     const user = await UserModel.findById(id);
//     if (!user) {
//       return res.status(404).send("User not found");
//     }

//     const newReport = await FraudReportModel.create({
//       ...value,
//       user: id,
//     });

//     user.fraudReport.push(newReport._id);

//     await user.save();

//     res.status(201).json({
//       message: "Your fraud report has been successfully submitted.",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const deleteFraudReport = async (req, res, next) => {
  try {
    const id = req.session?.user?.id || req?.user?.id;
    console.log("User ID:", id);
    console.log("Report ID:", req.params.reportId);
    // Find the user to ensure they exist
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Find and delete the report where _id matches and user ID matches
    const deletedReport = await FraudReportModel.findByIdAndDelete({
      _id: req.params.reportId,
      user: id,
    });

    if (!deletedReport) {
      return res.status(404).send({
        message:
          "Report not found or you do not have permission to delete this report.",
      });
    }

    user.fraudReport.pull(req.params.reportId);
    await user.save();

    res.status(200).json({
      message: "Your fraud report has been successfully deleted.",
    });
  } catch (error) {
    next(error);
  }
};

export const updateFraudReport = async (req, res, next) => {
  try {
    // Validate the request body
    const { error, value } = fraudReportSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Get user ID from session or JWT token
    const id = req.session?.user?.id || req?.user?.id;
    console.log("User ID:", id);
    console.log("Report ID:", req.params.reportId);

    // Find the user to ensure they exist
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Find and update the report where _id matches and user ID matches
    const updateReport = await FraudReportModel.findByIdAndUpdate(
      { _id: req.params.reportId, user: id }, // Query to find the report
      value, // Data to update
      { new: true } // Return the updated document
    );

    // Check if the report was found and updated
    if (!updateReport) {
      return res.status(404).send({
        message:
          "Report not found or you do not have permission to update this report.",
      });
    }

    res.status(200).json({
      message: "Your fraud report has been successfully updated.",
      report: updateReport,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getAFraudReport = async (req, res, next) => {
  try {
    const id = req.session?.user?.id || req?.user?.id;

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const aFraudReport = await FraudReportModel.findById(req.params.reportId);
    if (!aFraudReport) {
      return res.status(404).send("Report not found");
    }

    // Ensure the authenticated user is the owner of the report
    if (aFraudReport.status === "private") {
      if (!aFraudReport.user.equals(user._id)) {
        return res
          .status(403)
          .send("You do not have permission to view this report");
      }
    }

    res.status(200).send(aFraudReport);
  } catch (error) {
    next(error);
  }
};

export const checkANumber = async (req, res, next) => {
  try {
    const id = req.session?.user?.id || req?.user?.id;

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const { phone } = req.params;

    // Validate the request body
    const { error, value } = checkNumberSchema.validate({ phoneNumber: phone });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const checkNumber = await FraudReportModel.findOne({
      phoneNumber: phone,
    }).select("dateReported  dateOfIncidence network status comment");

    if (!checkNumber) {
      return res.status(404).json("No reports found for this number.");
    }
    res.status(200).json(checkNumber);
  } catch (error) {
    next(error);
  }
};

export const getFraudReports = async (req, res, next) => {
  try {
    // Validate query parameters
    const { error, value } = fraudReportQuerySchema.validate(req.query);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { phoneNumber, status, startDate, endDate, userReportsOnly } = value;

    // Build query
    let query = {};
    if (phoneNumber) query.phoneNumber = phoneNumber;
    if (status) query.status = status;
    if (startDate || endDate) {
      query.dateReported = {};
      if (startDate) query.dateReported.$gte = new Date(startDate);
      if (endDate) query.dateReported.$lte = new Date(endDate);
    }
    if (userReportsOnly) query.user = req.user.id;

    // Execute query
    const reports = await FraudReportModel.find(query)
      .sort({ dateReported: -1 })
      .populate("user", "firstName lastName email");

    res.status(200).json({ reports });
  } catch (error) {
    next(error);
  }
};

export const getPublicFraudReports = async (req, res, next) => {
  try {
    const { phoneNumber, startDate, endDate, page = 1, limit = 10 } = req.query;

    // Build query
    let query = { status: "public" }; // Only fetch public reports
    if (phoneNumber) query.fraudPhoneNumber = phoneNumber;
    if (startDate || endDate) {
      query.dateReported = {};
      if (startDate) query.dateReported.$gte = new Date(startDate);
      if (endDate) query.dateReported.$lte = new Date(endDate);
    }

    // Count total documents for pagination
    const total = await FraudReportModel.countDocuments(query);

    // Execute query with pagination
    const reports = await FraudReportModel.find(query)
      .sort({ dateReported: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .select(
        "fraudPhoneNumber mobileMoneyProvider dateReported fraudDescription"
      ) // Only select public-safe fields
      .lean(); // Use lean for better performance

    res.status(200).json({
      reports,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    next(error);
  }
};

export const searchFraudReport = async (req, res, next) => {
  try {
    const { phoneNumber } = req.params;

    // Validate the phone number
    const { error } = checkNumberSchema.validate({ phoneNumber });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const report = await FraudReportModel.findOne({
      fraudPhoneNumber: phoneNumber,
    })
      .select(
        "fraudFirstName fraudLastName fraudPhoneNumber mobileMoneyProvider dateReported fraudDescription"
      )
      .lean();

    if (!report) {
      return res
        .status(404)
        .json({ message: "No report found for this number." });
    }

    res.status(200).json(report);
  } catch (error) {
    next(error);
  }
};

export const addNewReport = async (req, res, next) => {
  try {
    const { phoneNumber, reportText } = req.body;

    // Validate input
    if (!phoneNumber || !reportText) {
      return res
        .status(400)
        .json({ message: "Phone number and report text are required." });
    }

    // Find existing report or create new one
    let report = await FraudReportModel.findOne({
      fraudPhoneNumber: phoneNumber,
    });

    if (!report) {
      report = new FraudReportModel({
        fraudPhoneNumber: phoneNumber,
        fraudDescription: reportText,
        // Add other necessary fields
      });
    } else {
      // Append new report to existing description
      report.fraudDescription += `\n\nNew report (${new Date().toISOString()}):\n${reportText}`;
    }

    await report.save();

    res.status(201).json({ message: "Report added successfully", report });
  } catch (error) {
    next(error);
  }
};


export const voteOnReport = async (req, res, next) => {
  try {
    const { reportId } = req.body;
    const userId = req.user?.id;

    // Validate report ID format
    // if (!mongoose.Types.ObjectId.isValid(reportId)) {
    //   return res.status(400).json({ message: 'Invalid report ID format' });
    // }

    const fraudReport = await FraudReportModel.findById(reportId);

    // Check if fraud report exists
    if (!fraudReport) {return res.status(404).json({ message: 'Fraud report not found' });
    }

    // Check if user has already voted
    if (fraudReport.reporters.includes(userId)) {
      return res.status(400).json({ message: 'User has already voted' });
    }

    // Record the vote
    fraudReport.reporters.push(userId);
    fraudReport.votes += 1;

    await fraudReport.save();

    res.status(200).json({ message: 'Vote recorded successfully', votes: fraudReport.votes });
  } catch (error) {
    next(error); 
  }
};

