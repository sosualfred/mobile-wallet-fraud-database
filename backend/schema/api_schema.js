import Joi from "joi";

export const apiKeySchema = Joi.object({
  apiKeyName: Joi.string().min(1).max(100).required().messages({
    "string.base": "Name must be a string.",
    "string.empty": "Name is required.",
    "string.min": "Name is required.",
    "string.max": "Name can't exceed 100 characters.",
  }),
  domain: Joi.array().items(Joi.string().domain()).optional().messages({
    "array.base": "Domains must be an array.",
    "array.items": "Each domain must be a valid domain format.",
    "string.domain": "Invalid domain format.",
  }),
});
