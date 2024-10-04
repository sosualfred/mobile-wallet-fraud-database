import Joi from "joi";
import sanitizeHtml from "sanitize-html";

export const fraudReportSchema = Joi.object({
  reporterFirstName: Joi.string().required().max(255),
  reporterLastName: Joi.string().required().max(255),
  reporterEmail: Joi.string().email().required(),
  reporterPhoneNumber: Joi.string()
    .pattern(/^0\d{9}$/)
    .message("Invalid Reporter Phone Number"),
  fraudPhoneNumber: Joi.string()
    .pattern(/^0\d{9}$/)
    .message("Invalid Fraudster Phone Number"),
  mobileMoneyProvider: Joi.string()
    .valid("mtn", "vodafone", "airtel-tigo")
    .required(),
  fraudFirstName: Joi.string().max(255),
  fraudLastName: Joi.string().max(255),
  dateReported: Joi.date().default(Date.now),
  dateOfIncidence: Joi.date()
    .max("now")
    .message("Date of Incidence cannot be in the future"),
  status: Joi.string().valid("private", "public").default("private"),
  fraudDescription: Joi.string()
    .max(500)
    .custom((value, helpers) => {
      const sanitizedValue = sanitizeHtml(value, {
        allowedTags: [],
        allowedAttributes: {},
      });
      return sanitizedValue;
    }),
  fraudImage: Joi.string().allow(null, ""),
  fraudEvidence: Joi.string().allow(null, ""),
});

export const checkNumberSchema = Joi.object({
  phoneNumber: Joi.string()
    .pattern(/^0\d{9}$/)
    .message("Invalid phone number format.")
    .custom((value, helpers) => {
      const sanitizedValue = sanitizeHtml(value, {
        allowedTags: [], // Disallow all HTML tags
        allowedAttributes: {}, // Disallow all attributes
      });
      return sanitizedValue;
    }),
});

export const fraudReportQuerySchema = Joi.object({
  phoneNumber: Joi.string()
    .pattern(/^0\d{9}$/)
    .message("Invalid phone number format.")
    .custom((value, helpers) => {
      const sanitizedValue = sanitizeHtml(value, {
        allowedTags: [], // Disallow all HTML tags
        allowedAttributes: {}, // Disallow all attributes
      });
      return sanitizedValue;
    }),
  status: Joi.string().valid("private", "public"),
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso().min(Joi.ref("startDate")),
  userReportsOnly: Joi.boolean(),
});

export const publicFraudReportQuerySchema = Joi.object({
  phoneNumber: Joi.string()
    .pattern(/^0\d{9}$/)
    .message("Invalid phone number format.")
    .custom((value, helpers) => {
      const sanitizedValue = sanitizeHtml(value, {
        allowedTags: [],
        allowedAttributes: {},
      });
      return sanitizedValue;
    }),
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso().min(Joi.ref("startDate")),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});
