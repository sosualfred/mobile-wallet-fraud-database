import Joi from "joi";

export const adminSchema = Joi.object({
    email: Joi.string().lowercase().email().required(),

    password: Joi.string()
    .min(8)
    .pattern(/[0-9]/)
    .message(
        'Passwsord must be at least 8 characters long and include at least one number'
    )
    .required(),
});